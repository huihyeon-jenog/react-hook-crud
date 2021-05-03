import "./App.css";
import api from "./api/data";
import React, { useEffect, useState } from "react";

function App() {
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [list, setList] = useState([]);

  const getData = async () => {
    await api
      .get("/data")
      .then((res) => {
        console.log(res);
        setList(res.data);
      })
      .catch((error) => {
        console.log("오류:" + error);
      });
  };
  const delItem = async (e) => {
    await api
      .delete(`/data/${e}`)
      .then((res) => {
        console.log(res);
        getData();
      })
      .catch((error) => {
        console.log("오류:" + error);
      });
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
  const addItem = async () => {
    const newData = {
      no: list.length + 1,
      name: nameInput,
      phone: phoneInput,
      email: emailInput,
      del: false,
      modify: false,
    };
    await api
      .post("/data", newData)
      .then(function (res) {
        console.log(res);
        setList([...list], res.data);
        getData();
      })
      .catch(function (error) {
        console.log("오류:" + error);
      });
    cancelItem();
  };
  const saveItem = async (e) => {
    await api
      .put(`/data/${e}`, {
        no: e,
        name: nameInput,
        phone: phoneInput,
        email: emailInput,
        del: false,
        modify: false,
      })
      .then(function (res) {
        console.log(res);
        setList(list);
        getData();
      })
      .catch(function (error) {
        console.log("오류:" + error);
      });
    cancelItem();
  };
  const cancelItem = () => {
    setNameInput("");
    setPhoneInput("");
    setEmailInput("");
  };

  const changeName = (e) => {
    setNameInput(e.target.value);
  };
  const changePhone = (e) => {
    setPhoneInput(e.target.value);
  };
  const changeEmail = (e) => {
    setEmailInput(e.target.value);
  };
  useEffect(() => {
    getData();
    console.log("액션");
  }, []);

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
              <div className="tr" key={item.id}>
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
                        saveItem(item.no);
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
