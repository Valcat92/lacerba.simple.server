import Express from "express";



const app = Express()
app.use(Express.json())
let cnt = 0
app.get('/', (req, res) => {
  cnt++
  res.send({ hello: 'world', cnt: cnt });
})

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000")
})

app.post('/', (req, res) => {
  cnt--
  res.send({ hello: 'world', cnt: cnt });
})

app.post('/reply', (req, res) => {
  const body = req.body;
  console.log(body)
  res.send({ body: body })
})


app.post('/stats', (req, res) => {
  const Numbers: number[] = req.body;
  console.log(Numbers)
  let sum = 0;
  Numbers.forEach(element => {
    sum = sum + element
  });
  let avg: number = sum / Numbers.length
  res.send(`La somma vale ${sum}, la media vale ${avg}`)
})


interface post {
  id: number,
  title: string,
  date: Date,
  content: string,
  draft: boolean,
}
type BlogData = Pick<post, 'content' | 'title'>

let Blog: post[] = [{  //let perchè così possiamo modificarlo e cancellarlo
  id: 0,
  title: "first post",
  date: new Date(),
  content: "this is the first post",
  draft: false
},{
id: 1,
title: "second post",
date: new Date(),
content: "this is the second post",
draft: false
},
]

app.get('/posts/', (req, res) => {
return res.send(Blog)
})

app.get('/posts/:id', (req, res) => {
  const id= Number(req.params.id)
  const post= Blog.find((Blog)=>Blog.id=id)
  return res.send(post)
  })

app.post('/posts', Express.json(), (req,res) => {
  const NewPost:post = {
    id:Blog.length,
    title:String(req.body.title),
    date:new Date(),
    content:String(req.body.content),
    draft:false
  }
  Blog.push(NewPost)
  return res.send(Blog)
})

app.delete('/posts/:id', (req, res) => {
  const id= Number(req.params.id)
  const postToDelete= Blog.find((Blog)=>Blog.id==id)
  if(!postToDelete) {
    return res.status(404).send({msg: "not found"})
  }
 Blog = Blog.filter((post)=>post.id!==id);
 return res.send(Blog)
  })

  app.put('/posts/:id', (req, res) => {
    const id= Number(req.params.id);
    const postData:Pick<post, 'content' | 'title'>=req.body;
    try{
      InputValidation(postData);
    } catch(error) {
      return res.status(403).send(error)
    };
    const postToUpdateIndex= Blog.findIndex((Blog)=>Blog.id==id)
    if(!Blog[postToUpdateIndex]) {
      return res.status(404).send({msg: "not found"})
    }
    Blog[postToUpdateIndex]={
      ...Blog[postToUpdateIndex],
      title:postData.title,
      content:postData.content
    }
   return res.send(Blog[postToUpdateIndex])
    })


    const InputValidation = (postData: BlogData) => {
      if (!postData.title) {
        throw new Error("Title field is required!")
      }
      if (!postData.content) {
        throw new Error("Content field is required!")
      }
    }