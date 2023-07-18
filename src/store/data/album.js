// export const album = {
//     state: () => ({
//         albums: [],
//         urlAlbum: 'albums',
//     }),
//     getters : {
//         albums(state){
//             return state.albums
//         }
//     },
//     mutations: {
//         albums(state, payload){
//             state.albums = [...payload]
//         }
//     },
//     actions: {
//         async getAllAlbums({dispatch, state, commit}){
//             let res = await dispatch('getAxios', state.urlAlbum)
//             if(res.status == 200){
//                 console.log('ALBUM:', res.data);
//             }
//         }
//     }
// }