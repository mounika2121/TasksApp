import {useState} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import {MdEdit} from 'react-icons/md'
import {RiDeleteBin5Fill} from 'react-icons/ri'
import {v4} from 'uuid'

import './index.css'

const Home = () => {
  const [tasks, setTasks] = useState([])
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [user, setUser] = useState('')
  const [plusIconClecked, setPlusIconClecked] = useState(false)
  const [editIconClicked, setEditIconClicked] = useState(false)
  const [cancelButonClicked, setcancelButtonClicked] = useState(false)

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleDateChange = event => {
    setDate(event.target.value)
  }

  const handleTimeChange = event => {
    setTime(event.target.value)
  }

  const handleUserChange = event => {
    setUser(event.target.value)
  }

  const onClickCancelButton = () => {
    setcancelButtonClicked(prevState => !prevState)
  }

  const onEditIconClicked = () => {
    setEditIconClicked(prevState => !prevState)
    setPlusIconClecked(prevState => !prevState)
  }

  const onClickPlus = () => {
    setPlusIconClecked(prevState => !prevState)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const newTask = {
      id: v4(),
      name,
      date,
      time,
      user,
    }
    setTasks([...tasks, newTask])
    setName('')
    setDate('')
    setTime('')
    setUser('')
  }

  const handleDelete = id => {
    const filteredTasks = tasks.filter(each => each.id !== id)
    setTasks(filteredTasks)
  }

  return (
    <div className="bg-container">
      <div className="app-container">
        {plusIconClecked ? (
          <form onSubmit={handleSubmit}>
            <div className="labels-container">
              <label htmlFor="task-des">Task Description</label>
              <input
                type="text"
                placeholder="Description"
                id="task-des"
                value={name}
                className="task-descreption"
                onChange={handleNameChange}
              />
              <div className="date-time">
                <div className="date-container">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    placeholder="Date"
                    id="date"
                    className="date-input"
                    value={date}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="time-container">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    placeholder="Time"
                    className="time-input"
                    id="time"
                    value={time}
                    onChange={handleTimeChange}
                  />
                </div>
              </div>
              <div className="select-container">
                <label htmlFor="user">Assign User</label>
                <select
                  className="select-option"
                  onChange={handleUserChange}
                  value={user}
                  id="user"
                >
                  <option>Plan User</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="buttons-container">
                <button type="button" className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="add-new-task-container">
            <p className="task">Tasks</p>
            <hr className="hr-line" />
            <button className="plus-button" onClick={onClickPlus} type="button">
              <AiOutlinePlus size={12} className="plus-icon" />
            </button>
          </div>
        )}
      </div>
      <div className="app-container">
        <ul className="ul-list">
          {editIconClicked ? (
            <form onSubmit={handleSubmit}>
              <div className="labels-container">
                <label htmlFor="task-des">Task Description</label>
                <input
                  type="text"
                  placeholder="Descreption"
                  id="task-des"
                  value={name}
                  className="task-descreption"
                  onChange={handleNameChange}
                />
                <div className="date-time">
                  <div className="date-container">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      placeholder="Date"
                      id="date"
                      className="date-input"
                      value={date}
                      onChange={handleDateChange}
                    />
                  </div>
                  <div className="time-container">
                    <label htmlFor="time">Time</label>
                    <input
                      type="time"
                      placeholder="Time"
                      className="time-input"
                      id="time"
                      value={time}
                      onChange={handleTimeChange}
                    />
                  </div>
                </div>
                <div className="select-container">
                  <label htmlFor="user">Assign User</label>
                  <select
                    className="select-option"
                    onChange={handleUserChange}
                    id="user"
                    value={user}
                  >
                    <option>Plan User</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="buttons-container">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={onClickCancelButton}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Save
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              {tasks.map(task => (
                <li key={task.id}>
                  <div className="add-new-task-container list-task">
                    <p className="task">Tasks</p>
                    <hr className="hr-line" />
                    <button className="plus-button" type="button">
                      <AiOutlinePlus size={12} className="plus-icon" />
                    </button>
                  </div>
                  <div className="list-container">
                    <div className="task-name-date-time">
                      <p className="name">{task.name}</p>
                      <p>{task.user}</p>
                      <div>
                        <p>{task.date}</p>
                        <p>{task.time}</p>
                      </div>
                    </div>
                    <div>
                      <button
                        className="plus-button icon"
                        onClick={onEditIconClicked}
                        type="button"
                      >
                        <MdEdit size={15} />
                      </button>

                      <button
                        className="plus-button icon"
                        type="button"
                        onClick={() => handleDelete(task.id)}
                      >
                        <RiDeleteBin5Fill size={15} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          )}
          {cancelButonClicked && (
            <div>
              {tasks.map(task => (
                <li key={task.id}>
                  <div className="add-new-task-container list-task">
                    <p className="task">Tasks</p>
                    <hr className="hr-line" />
                    <button className="plus-button" type="button">
                      <AiOutlinePlus size={12} className="plus-icon" />
                    </button>
                  </div>
                  <div className="list-container">
                    <div className="task-name-date-time">
                      <p className="name">{task.name}</p>
                      <p>{task.user}</p>
                      <div>
                        <p>{task.date}</p>
                        <p>{task.time}</p>
                      </div>
                    </div>
                    <div>
                      <button
                        className="plus-button icon"
                        type="button"
                        onClick={onEditIconClicked}
                      >
                        <MdEdit size={15} />
                      </button>
                      <button
                        className="plus-button icon"
                        type="button"
                        onClick={() => handleDelete(task.id)}
                      >
                        <RiDeleteBin5Fill size={15} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Home
