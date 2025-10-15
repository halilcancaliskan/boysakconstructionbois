import React, { useState, useEffect } from 'react'
import { db, auth } from './firebase'
import { ref, push, onValue, remove } from 'firebase/database'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth'

interface GalleryProject {
  id: string
  imageUrl: string
  description: string
  location: string
  createdAt: number
}

export default function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [loginError, setLoginError] = useState('')
  const [projects, setProjects] = useState<GalleryProject[]>([])
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    description: '',
    location: 'Nord'
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      const projectsRef = ref(db, 'galleryProjects')
      const unsubscribe = onValue(projectsRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          const projectsList: GalleryProject[] = Object.entries(data).map(([id, project]: [string, any]) => ({
            id,
            ...project
          }))
          setProjects(projectsList.sort((a, b) => b.createdAt - a.createdAt))
        } else {
          setProjects([])
        }
      })
      return () => unsubscribe()
    }
  }, [user])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoading(true)
    
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      console.error('Erreur de connexion:', error)
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        setLoginError('Email ou mot de passe incorrect')
      } else if (error.code === 'auth/user-not-found') {
        setLoginError('Utilisateur non trouvé')
      } else if (error.code === 'auth/invalid-email') {
        setLoginError('Adresse email invalide')
      } else {
        setLoginError('Erreur de connexion. Veuillez réessayer.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Erreur de déconnexion:', error)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      alert('Veuillez sélectionner une image')
      return
    }

    setUploading(true)
    try {
      // Upload image to Cloudinary via unsigned upload
      const uploadFormData = new FormData()
      uploadFormData.append('file', selectedFile)
      uploadFormData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default')
      
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: uploadFormData
        }
      )

      const cloudinaryData = await cloudinaryResponse.json()

      if (!cloudinaryResponse.ok) {
        console.error('Cloudinary error:', cloudinaryData)
        throw new Error(`Erreur Cloudinary: ${cloudinaryData.error?.message || 'Upload preset introuvable'}`)
      }
      const imageUrl = cloudinaryData.secure_url
      const publicId = cloudinaryData.public_id

      // Save project to Realtime Database
      await push(ref(db, 'galleryProjects'), {
        imageUrl,
        description: formData.description,
        location: formData.location,
        createdAt: Date.now(),
        cloudinaryPublicId: publicId
      })

      // Reset form
      setFormData({ description: '', location: 'Nord' })
      setSelectedFile(null)
      setPreviewUrl('')
      alert('Projet ajouté avec succès !')
    } catch (error) {
      console.error('Erreur lors de l\'ajout du projet:', error)
      alert('Erreur lors de l\'ajout du projet')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (project: GalleryProject) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return
    }

    try {
      // Delete from Database
      await remove(ref(db, `galleryProjects/${project.id}`))

      // Note: Cloudinary images can be deleted via API if needed
      // For now, we keep them as they don't cost anything in free tier
      // You can manually delete them from Cloudinary dashboard if needed

      alert('Projet supprimé avec succès !')
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      alert('Erreur lors de la suppression du projet')
    }
  }

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '24px' }}>Chargement...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
            Admin - Galerie Projets
          </h2>
          {loginError && (
            <div className="alert alert-danger" role="alert" style={{ marginBottom: '20px' }}>
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Email
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                style={{ padding: '12px', fontSize: '16px' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                required
                style={{ padding: '12px', fontSize: '16px' }}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-100"
              style={{ padding: '12px', fontSize: '16px', fontWeight: 'bold' }}
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '20px' }}>
      <div className="container-xl">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>Administration - Galerie Projets</h1>
          <div>
            <a href="/" className="btn btn-secondary me-2">Retour au site</a>
            <button 
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Form to add new project */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px' }}>Ajouter un nouveau projet</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Image du projet *</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileSelect}
                  required
                />
                {previewUrl && (
                  <div style={{ marginTop: '10px' }}>
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '5px' }}
                    />
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Description *</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description du projet"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Localisation</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Ex: Nord, Lille, etc."
                  />
                </div>
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={uploading}
            >
              {uploading ? 'Envoi en cours...' : 'Ajouter le projet'}
            </button>
          </form>
        </div>

        {/* List of existing projects */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px' }}>Projets existants ({projects.length})</h3>
          <div className="row">
            {projects.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
                Aucun projet pour le moment. Ajoutez-en un ci-dessus !
              </p>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="col-md-4 mb-4">
                  <div style={{ 
                    border: '1px solid #ddd', 
                    borderRadius: '8px', 
                    overflow: 'hidden',
                    transition: 'transform 0.2s',
                  }}>
                    <img 
                      src={project.imageUrl} 
                      alt={project.description}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '15px' }}>
                      <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
                        {project.location}
                      </p>
                      <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>
                        {project.description}
                      </p>
                      <button 
                        className="btn btn-danger btn-sm w-100"
                        onClick={() => handleDelete(project)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
