import { useEffect, useState } from 'react'
import { db, auth } from './firebase'
import { ref, onValue } from 'firebase/database'

export function FirebaseDiagnostic() {
  const [diagnostics, setDiagnostics] = useState<any>({})

  useEffect(() => {
    const runDiagnostics = async () => {
      const results: any = {}

      // 1. Check auth
      results.authUser = auth.currentUser ? {
        email: auth.currentUser.email,
        uid: auth.currentUser.uid
      } : null

      // 2. Check database connection
      try {
        const testRef = ref(db, '.info/connected')
        onValue(testRef, (snapshot) => {
          results.dbConnected = snapshot.val()
          setDiagnostics({...results})
        })
      } catch (error) {
        results.dbError = error
      }

      // 3. Check contact-messages
      try {
        const contactRef = ref(db, 'contact-messages')
        onValue(contactRef, (snapshot) => {
          const data = snapshot.val()
          results.contactMessages = {
            exists: !!data,
            count: data ? Object.keys(data).length : 0,
            sample: data ? Object.keys(data).slice(0, 2) : []
          }
          setDiagnostics({...results})
        }, (error) => {
          results.contactMessagesError = error.message
          setDiagnostics({...results})
        })
      } catch (error: any) {
        results.contactMessagesError = error.message
      }

      // 4. Check galleryProjects
      try {
        const galleryRef = ref(db, 'galleryProjects')
        onValue(galleryRef, (snapshot) => {
          const data = snapshot.val()
          results.galleryProjects = {
            exists: !!data,
            count: data ? Object.keys(data).length : 0
          }
          setDiagnostics({...results})
        })
      } catch (error: any) {
        results.galleryProjectsError = error.message
      }

      setDiagnostics(results)
    }

    runDiagnostics()
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      background: 'white',
      padding: 20,
      borderRadius: 10,
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      maxWidth: 400,
      zIndex: 9999,
      fontSize: 12,
      fontFamily: 'monospace'
    }}>
      <h4 style={{ margin: '0 0 10px 0', fontSize: 14 }}>🔍 Firebase Diagnostic</h4>
      <pre style={{ margin: 0, overflow: 'auto', maxHeight: 400 }}>
        {JSON.stringify(diagnostics, null, 2)}
      </pre>
    </div>
  )
}
