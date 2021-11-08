import loadHome from "../main.js";

// describe('Home: main test', () => {

//     test('should create a source tag', () => {
        
//         const url = "http://url-for-test";

//         document.body.innerHTML = `
//             <div id="how">
//                 <div class="video">
//                     <video controls muted loop autoplay>
//                         Your browser doesn't support embedded videos.
//                     </video>
//                     <input type="hidden" class="url-video" value="${url}">
//                 </div>
//             </div>
//         `
//         loadHome();
    
//         const source = document.querySelector("#how .video source");
    
//         expect(source).toBeTruthy();
//         expect(source.getAttribute("type")).toBe("video/mp4");
//         expect(source.getAttribute("src")).toBe(url);

//     })
// })

console.log(loadHome);
