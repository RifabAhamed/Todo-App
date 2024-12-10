
const ActionCard = (title, description, actionStatus) => {
  return (
    <div>
        <div>{title}</div>
        <div>{description}</div>
        <div>{actionStatus}</div>
    </div>
  )
}

export default ActionCard