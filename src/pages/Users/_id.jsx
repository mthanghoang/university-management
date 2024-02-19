import { useParams } from 'react-router-dom'
function UserView() {
  const params = useParams()
  return (
    <div>User {params.userid}</div>
  )
}

export default UserView