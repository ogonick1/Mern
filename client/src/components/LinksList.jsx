import { Link } from "react-router-dom"

export const LinksList = ({ links }) => {
  // if (!links.length) {
  //   return <p className="center"></p>
  // }
  console.log(links)
  return(
    <>
    <h2 className="white-text">link List</h2>
    
    <table className="white-text">
      <thead>
        <tr>
          <th>N</th>
          <th>Original</th>
          <th>Your</th>
          <th>open</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index +1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td><Link to={`/detail/${link._id}`}>Open</Link></td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  )
}