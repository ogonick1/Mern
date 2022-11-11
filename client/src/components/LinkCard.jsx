
export const LinkCard = ({ link }) => {

  return (
    <>
      <h2 className="white-text">Link</h2>
      <div className="white-text">
        <p>Your link: <a href={link.link.to} target="_blank" rel="noreferrer"><b>{link.link.to}</b></a> </p>
        <p>Whith link: <a href={link.link.from} target="_blank" rel="noreferrer"><b>{link.link.from}</b></a> </p>
        <p>Clicks: <b>{link.link.clicks}</b></p>
        <p>Date create:  <b>{new Date(link.link.data).toLocaleDateString()}</b></p>
      </div>
    </>
  )
}