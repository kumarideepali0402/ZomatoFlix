// // import React, { useState, useEffect, use } from 'react'
// // import '../../styles/profile.css'
// // import { useParams } from 'react-router-dom'
// // import axios from 'axios'

// // const Profile = () => {
// //     const { id } = useParams()
// //     const [ profile, setProfile ] = useState(null)
// //     const [ videos, setVideos ] = useState([])

// //     useEffect(() => {
// //         axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
// //             .then(response => {
// //                 setProfile(response.data.foodPartner)
// //                 setVideos(response.data.foodPartner.foodk)
// //             })
// //     }, [ id ])


// //     return (
// //         <main className="profile-page">
// //             <section className="profile-header">
// //                 <div className="profile-meta">

// //                     <img className="profile-avatar" src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" alt="" />

// //                     <div className="profile-info">
// //                         <h1 className="profile-pill profile-business" title="Business name">
// //                             {profile?.name}
// //                         </h1>
// //                         <p className="profile-pill profile-address" title="Address">
// //                             {profile?.address}
// //                         </p>
// //                     </div>
// //                 </div>

// //                 <div className="profile-stats" role="list" aria-label="Stats">
// //                     <div className="profile-stat" role="listitem">
// //                         <span className="profile-stat-label">total meals</span>
// //                         <span className="profile-stat-value">{profile?.totalMeals}</span>
// //                     </div>
// //                     <div className="profile-stat" role="listitem">
// //                         <span className="profile-stat-label">customer served</span>
// //                         <span className="profile-stat-value">{profile?.customersServed}</span>
// //                     </div>
// //                 </div>
// //             </section>

// //             <hr className="profile-sep" />

// //             <section className="profile-grid" aria-label="Videos">
// //                 {videos.map((v) => (
// //                     <div key={v.id} className="profile-grid-item">
// //                         {/* Placeholder tile; replace with <video> or <img> as needed */}


// //                         <video
// //                             className="profile-grid-video"
// //                             style={{ objectFit: 'cover', width: '100%', height: '100%' }}
// //                             src={v.video} muted ></video>


// //                     </div>
// //                 ))}
// //             </section>
// //         </main>
// //     )
// // }

// // export default Profile
// import React, { useState, useEffect } from 'react'
// import '../../styles/profile.css'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'

// const Profile = () => {
//     const { id } = useParams()
//     const [ profile, setProfile ] = useState(null)
//     const [ videos, setVideos ] = useState([])
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
//             .then(response => {
//                 console.log('Profile response:', response.data) // 🔧 ADDED: Debug log
//                 setProfile(response.data.foodPartner)
//                 // 🔧 FIXED: Changed from 'foodk' to 'foodItems'
//                 setVideos(response.data.foodItems || [])
//             })
//             .catch(error => {
//                 console.error('Error fetching profile:', error)
//             })
//             .finally(() => {
//                 setLoading(false)
//             })
//     }, [id])

//     if (loading) return <div>Loading...</div>
//     if (!profile) return <div>Profile not found</div>

//     return (
//         <main className="profile-page">
//             <section className="profile-header">
//                 <div className="profile-meta">
//                     <img className="profile-avatar" src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" alt={profile.name} />

//                     <div className="profile-info">
//                         <h1 className="profile-pill profile-business" title="Business name">
//                             {profile.name}
//                         </h1>
//                         <p className="profile-pill profile-address" title="Address">
//                             {profile.address}
//                         </p>
//                         <p className="profile-pill profile-email" title="Email">
//                             {profile.email}
//                         </p>
//                         <p className="profile-pill profile-phone" title="Phone">
//                             {profile.phone}
//                         </p>
//                     </div>
//                 </div>

//                 <div className="profile-stats" role="list" aria-label="Stats">
//                     <div className="profile-stat" role="listitem">
//                         <span className="profile-stat-label">Total Videos</span>
//                         <span className="profile-stat-value">{videos.length}</span>
//                     </div>
//                     <div className="profile-stat" role="listitem">
//                         <span className="profile-stat-label">Contact</span>
//                         <span className="profile-stat-value">{profile.contactName}</span>
//                     </div>
//                 </div>
//             </section>

//             <hr className="profile-sep" />

//             <section className="profile-grid" aria-label="Videos">
//                 {videos.length === 0 ? (
//                     <p>No videos yet</p>
//                 ) : (
//                     videos.map((video) => (
//                         <div key={video._id} className="profile-grid-item">
//                             <video
//                                 className="profile-grid-video"
//                                 src={video.video}
//                                 muted
//                                 controls
//                                 style={{ objectFit: 'cover', width: '100%', height: '100%' }}
//                             />
//                             <div className="video-info">
//                                 <p>{video.name}</p>
//                                 <p>{video.description}</p>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </section>
//         </main>
//     )
// }

// export default Profile



// import React, { useState, useEffect } from 'react'
// import '../../styles/profile.css'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'

// const Profile = () => {
//     const { id } = useParams()
//     const [profile, setProfile] = useState(null)
//     const [videos, setVideos] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         console.log('Fetching profile for ID:', id)
//         axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
//             .then(response => {
//                 console.log('Full API response:', response.data)
//                 console.log('Food Partner data:', response.data.foodPartner)
//                 console.log('Food Items data:', response.data.foodItems)
                
//                 setProfile(response.data.foodPartner)
//                 setVideos(response.data.foodItems || [])
//             })
//             .catch(error => {
//                 console.error('Error fetching profile:', error)
//                 console.error('Error response:', error.response?.data)
//                 setError(error.response?.data?.msg || 'Failed to load profile')
//             })
//             .finally(() => {
//                 setLoading(false)
//             })
//     }, [id])

//     if (loading) return <div className="p-4 text-white">Loading profile...</div>
//     if (error) return <div className="p-4 text-white">Error: {error}</div>
//     if (!profile) return <div className="p-4 text-white">Profile not found</div>

//     return (
//         <main className="profile-page">
//             <section className="profile-header">
//                 <div className="profile-meta">
//                     <img className="profile-avatar" src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" alt={profile.name} />

//                     <div className="profile-info">
//                         <h1 className="profile-pill profile-business">
//                             {profile.name}
//                         </h1>
//                         <p className="profile-pill profile-address">
//                             {profile.address}
//                         </p>
//                         <p className="profile-pill profile-email">
//                             {profile.email}
//                         </p>
//                         <p className="profile-pill profile-phone">
//                             {profile.phone}
//                         </p>
//                         <p className="profile-pill profile-contact">
//                             Contact: {profile.contactName}
//                         </p>
//                     </div>
//                 </div>

//                 <div className="profile-stats">
//                     <div className="profile-stat">
//                         <span className="profile-stat-label">Total Videos</span>
//                         <span className="profile-stat-value">{videos.length}</span>
//                     </div>
//                     <div className="profile-stat">
//                         <span className="profile-stat-label">Since</span>
//                         <span className="profile-stat-value">
//                             {new Date(profile.createdAt).toLocaleDateString()}
//                         </span>
//                     </div>
//                 </div>
//             </section>

//             <hr className="profile-sep" />

//             <section className="profile-grid">
//                 {videos.length === 0 ? (
//                     <p className="text-white text-center py-8">No videos uploaded yet</p>
//                 ) : (
//                     videos.map((video) => (
//                         <div key={video._id} className="profile-grid-item">
//                             <video
//                                 className="profile-grid-video"
//                                 src={video.video}
//                                 muted
//                                 controls
//                                 style={{ objectFit: 'cover', width: '100%', height: '100%' }}
//                             />
//                             <div className="video-info p-2">
//                                 <p className="text-white font-semibold">{video.name}</p>
//                                 <p className="text-gray-300 text-sm">{video.description}</p>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </section>
//         </main>
//     )
// }

// export default Profile



import React, { useState, useEffect } from 'react'
import '../../styles/profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        console.log('🔄 Fetching profile for ID:', id)
        axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                console.log('✅ Full API response:', response.data)
                console.log('🔍 Food Partner data:', response.data.foodPartner)
                console.log('🎬 Food Items data:', response.data.foodItems)
                console.log('📊 Number of food items:', response.data.foodItems?.length)
                
                // Log each food item to see their structure
                if (response.data.foodItems && response.data.foodItems.length > 0) {
                    response.data.foodItems.forEach((item, index) => {
                        console.log(`🍕 Food item ${index + 1}:`, item)
                        console.log(`   - Name: ${item.name}`)
                        console.log(`   - Video URL: ${item.video}`)
                        console.log(`   - Description: ${item.description}`)
                    })
                }
                
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodItems || [])
            })
            .catch(error => {
                console.error('❌ Error fetching profile:', error)
                console.error('📡 Error response:', error.response?.data)
                setError(error.response?.data?.msg || 'Failed to load profile')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    if (loading) return <div className="p-4 text-white">Loading profile...</div>
    if (error) return <div className="p-4 text-white">Error: {error}</div>
    if (!profile) return <div className="p-4 text-white">Profile not found</div>

    console.log('🎯 Current videos state:', videos) // 🔧 DEBUG current state

    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">
                    <img className="profile-avatar" src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" alt={profile.name} />

                    <div className="profile-info">
                        <h1 className="profile-pill profile-business">
                            {profile.name}
                        </h1>
                        <p className="profile-pill profile-address">
                            {profile.address}
                        </p>
                        <p className="profile-pill profile-email">
                            {profile.email}
                        </p>
                        <p className="profile-pill profile-phone">
                            {profile.phone}
                        </p>
                        <p className="profile-pill profile-contact">
                            Contact: {profile.contactName}
                        </p>
                    </div>
                </div>

                <div className="profile-stats">
                    <div className="profile-stat">
                        <span className="profile-stat-label">Total Videos</span>
                        <span className="profile-stat-value">{videos.length}</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Since</span>
                        <span className="profile-stat-value">
                            {new Date(profile.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" />

            <section className="profile-grid">
                {videos.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-white text-lg">No videos uploaded yet</p>
                        <p className="text-gray-400 mt-2">This food partner hasn't uploaded any videos</p>
                    </div>
                ) : (
                    videos.map((video) => (
                        <div key={video._id} className="profile-grid-item">
                            <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden">
                                <video
                                    className="w-full h-full object-cover"
                                    src={video.video}
                                    muted
                                    controls
                                    preload="metadata"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="video-info p-3">
                                <p className="text-white font-semibold text-lg">{video.name}</p>
                                <p className="text-gray-300 text-sm mt-1">{video.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </main>
    )
}

export default Profile