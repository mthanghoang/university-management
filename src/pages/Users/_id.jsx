import { useParams } from 'react-router-dom'
function UserView() {
  const params = useParams()
  console.log(params)
  return (
    <div>User {params.userid}</div>
  )
}

export default UserView