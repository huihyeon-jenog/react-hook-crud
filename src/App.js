import "./App.css";
import { useState } from "react";

const data = [
  {
    no: "1",
    name: "User1",
    phone: "02-1234567",
    email: "aaa@mail.com",
    del: false,
    modify: false,
  },
  {
    no: "2",
    name: "User2",
    phone: "02-1234567",
    email: "ccc@mail.com",
    del: false,
    modify: false,
  },
  {
    no: "3",
    name: "User3",
    phone: "02-1234567",
    email: "ddd@mail.com",
    del: false,
    modify: false,
  },
  {
    no: "4",
    name: "User4",
    phone: "02-1234567",
    email: "eee@mail.com",
    del: false,
    modify: false,
  },
];
function App() {
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [list, setList] = useState(data);

  const delItem = (e) => {
    setList(list.filter((item) => item.no !== e));
  };
  const modifyItem = (e) => {
    const newData = list.filter((item) => {
      if (item.no === e) {
        item.modify = !item.modify;
        return item;
      }
    });
    setNameInput(newData[0].name);
    setPhoneInput(newData[0].phone);
    setEmailInput(newData[0].email);
  };
  const addItem = () => {
    const newData = {
      no: list.length + 1,
      name: nameInput,
      phone: phoneInput,
      email: emailInput,
      del: false,
      modify: false,
    };

    setList([...list, newData]);
    cancelItem();
  };
  const saveItem = () => {
    const newData = list.map((item) => {
      if (item.modify === true) {
        return {
          no: item.no,
          name: nameInput,
          phone: phoneInput,
          email: emailInput,
          del: item.del,
          modify: !item.modify,
        };
      } else {
        return item;
      }
    });
    setNameInput("");
    setPhoneInput("");
    setEmailInput("");
    setList(newData);
  };
  const cancelItem = () => {
    setNameInput("");
    setPhoneInput("");
    setEmailInput("");
  };

  const changeName = (e) => {
    // const modifyItem = list.filter((item)=>{if(item.no === e){}})
    setNameInput(e.target.value);
  };
  const changePhone = (e) => {
    setPhoneInput(e.target.value);
  };
  const changeEmail = (e) => {
    setEmailInput(e.target.value);
  };
  return (
    <div className="App">
      <h1>Main UI</h1>
      <div className="table">
        <div className="table__header">
          <div className="tr">
            <div className="th">No.</div>
            <div className="th">Name</div>
            <div className="th">Phone</div>
            <div className="th">Email</div>
            <div>Action</div>
          </div>
        </div>
        <div className="table__body">
          {list.map((item) => {
            return (
              <div className="tr">
                <div className="td" data-title="No.">
                  {item.no}
                </div>
                <div className="td" data-title="Name">
                  {item.modify ? (
                    <input
                      type="text"
                      value={nameInput}
                      onChange={changeName}
                    />
                  ) : (
                    item.name
                  )}
                </div>
                <div className="td" data-title="Phone">
                  {item.modify ? (
                    <input
                      type="text"
                      value={phoneInput}
                      onChange={changePhone}
                    />
                  ) : (
                    item.phone
                  )}
                </div>
                <div className="td" data-title="Email">
                  {item.modify ? (
                    <input
                      type="text"
                      value={emailInput}
                      onChange={changeEmail}
                    />
                  ) : (
                    item.email
                  )}
                </div>
                <div className="td" data-title="Action">
                  <div className="btn--delete" onClick={() => delItem(item.no)}>
                    Delete
                  </div>
                  <div
                    className="btn--modify"
                    onClick={() => {
                      if (item.modify) {
                        saveItem();
                      } else {
                        modifyItem(item.no);
                      }
                    }}
                  >
                    {item.modify ? "완료" : "Modify"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <h1>Modification UI</h1>

      <form>
        <div className="form">
          <div className="text__field">
            <label className="title">Name:</label>
            <input className="text" value={nameInput} onChange={changeName} />
          </div>
          <div className="text__field">
            <label className="title">Phone:</label>
            <input className="text" value={phoneInput} onChange={changePhone} />
          </div>
          <div className="text__field">
            <label className="title">Email:</label>
            <input className="text" value={emailInput} onChange={changeEmail} />
          </div>
          <div className="text__field">
            <div type="submit" className="btn--add" onClick={addItem}>
              추가
            </div>
            <div type="submit" className="btn--save" onClick={saveItem}>
              수정
            </div>
            <div type="cancel" className="btn--cancel" onClick={cancelItem}>
              삭제
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
