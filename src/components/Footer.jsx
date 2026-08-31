import data from '../data.json'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">{data.footer.text}</p>
    </footer>
  )
}
