import { useToast } from '@chakra-ui/react';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { GlobalContext } from './GlobalContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth } from '../Config/firebase';
import { getCollectionWhereFirebase, getSingleDocumentFirebase } from '../Api/firebaseApi';



function GlobalProvider({ children }) {
	const [data, setData] = useState({})
	const [authentication, setAuthentication] = useState()
	const [loading, setLoading] = useState(true)
	const toast = useToast()

	const handleToast = (title, description, status) => {
		toast({
			title: title,
			description: description,
			status: status,
			duration: 9000,
			isClosable: true,
			position: 'top-right',
		})
	}

	const getWebConfig = async () => {
		const subdomain = window.location.host.split('.')
        console.log(authentication)
		if (subdomain.length > 0 && subdomain[0] !== 'terong.site') {
			console.log(subdomain, 'subdomain')
			if (subdomain[1] === "localhost:3001"){
				subdomain[1] = "terong.site"
			}
			const res = await getCollectionWhereFirebase('domains', 'domain', 'array-contains', `${subdomain[0]}.${subdomain[1]}`,)
            console.log(res)
			const resPages = await getSingleDocumentFirebase(`funnels/${res[0]?.funnelId}/page`, res[0]?.pageId)

            console.log(resPages)
			if (resPages) {
				console.log(resPages,'ini respages')
				setData({ webConfig: resPages })
				setLoading(false)
			} else {
				setData({ webConfig: null })
				setLoading(false)
			}
		}
	}

	useEffect(() => {
		getWebConfig()
		return () => {
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const authSub = onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuthentication({ auth: true, uid: user?.uid })
			} else {
				setAuthentication({ auth: false })
			}
		});
		return () => {
			authSub()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.webConfig])

	useEffect(() => {
		console.log(`${data?.webConfig?.projectId}-${auth?.currentUser?.uid}-----project id - auth`)
		console.log(auth, "auth")

		// const wishListSnapshot = onSnapshot(doc(db, `wishlist`, `${data?.webConfig?.projectsId}-${auth?.uid}`), (doc) => {
		// 	setWishlist(doc.data())
		// });

		return () => {
			// wishListSnapshot()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth, data?.webConfig])



	return (
		<GlobalContext.Provider value={{
			...data, ...authentication, setLoading, loading, handleToast,
		}} >
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider