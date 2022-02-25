export function handleImg(img){
  let image=img.split(',');
  if(image.length>=1){
    return image[0];
  }
}
export default {
  getUrlKey:function(name){
    return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
  }
}
