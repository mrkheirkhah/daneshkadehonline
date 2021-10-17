export default async function ({redirect,$axios,route }) {
    const block =await $axios.get(
        `/api/Visitor/VisitorHome/CheckVisitorBlock/${route.params.id}`
      )
      if(block.data.data==true){
          return redirect('/ban/'+route.params.id)
      }
    }