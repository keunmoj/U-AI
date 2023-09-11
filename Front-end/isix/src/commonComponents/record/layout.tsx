export default function Layout(props : any) {
  return (
    <form>
      <h2>Record</h2>
      {props.children}
    </form>
  )
}