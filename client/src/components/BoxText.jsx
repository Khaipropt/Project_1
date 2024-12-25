import {useState} from "react";
import {Container, Button} from "react-bootstrap"
import Nhap from "./Input/Nhap";
import ChucNang from "./Input/Chucnang";
const BoxText = () =>{
    const [status, setStatus] = useState(false)
    const changeStatus = async (e) => {
      await setStatus(e);
      alert(status);
    };
    return(
        <div class = "box-text">
          <Container style={{ 
            display: 'flex', 
            justifyContent: 'space-between' 
            }}>
            <h1 class="bt-h1-1" onClick={() => changeStatus(true)}>Nhập</h1>
            <h1 class="bt-h1-1" onClick={() => changeStatus(false)}>Chức năng</h1>
          </Container>
          <Container>
            {
              status ? <Nhap/> : <ChucNang/>
            }
          </Container>
        </div>
    );
};

export default BoxText;