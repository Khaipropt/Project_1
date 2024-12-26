import {useState} from "react";
import {Container, Button} from "react-bootstrap"
import Nhap from "./Input/Nhap";
import ChucNang from "./Input/Chucnang";
import KetQua from "./Input/KetQua";
const BoxText = () =>{
    const [status, setStatus] = useState(false);
    const [ketQua, setKetQua] = useState(4);
    const [kieuKetQua, setKieuKetQua] = useState([
      '',
      ,'liên thông',
      'chu trình',
      'đường đi ngắn nhất'
    ])
    // 1: Không hiển thị kết quả
    // 2: Hiển thị kết quả đồ thị liên thông
    // 3: HIển thị kết quả đồ thị các chu trình
    // 4: Hiển thị kết quả đường đi ngắn nhất
    const changeStatus = async (e) => {
      await setStatus(e);
    };
    return(
        <div class = "box-text">
          {!(ketQua-1) && 
          <>
          <Container style={{ 
            display: 'flex', 
            justifyContent: 'space-between' 
            }}>
            <h1 class="bt-h1-1" onClick={() => changeStatus(true)}>Nhập</h1>
            <h1 class="bt-h1-1" onClick={() => changeStatus(false)}>Chức năng</h1>
          </Container>
          <Container style={{
            marginLeft:20
          }}>
            {
              status ? <Nhap/> : <ChucNang/>
            }
          </Container>
          </>
          }
          {(2<=ketQua) && (ketQua <=4) && <>
            
            <Container style={{ 
            display: 'flex', 
            justifyContent: 'center' 
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi-bi-house" viewBox="0 0 16 16"
            style={{
              marginTop: 40
            }
          } onClick={() => setKetQua(1)}
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
            </svg>
            <h2 class="bt-h2-2" onClick={() => changeStatus(true)}>Kết quả {kieuKetQua[ketQua]}</h2>
          </Container>
          <Container style={{
            marginLeft:20
          }}>
            <KetQua result={ketQua}/>
          </Container>
          </>}
        </div>
    );
};

export default BoxText;