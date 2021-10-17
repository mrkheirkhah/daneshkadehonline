export default async function ({redirect,$axios,route }) {
    const block =await $axios.get(
        `/api/Visitor/VisitorHome/CheckVisitorBlock/${route.params.id}`
      )
      if(block.data.data==false){
          return redirect('/'+route.params.id)
      }
    }