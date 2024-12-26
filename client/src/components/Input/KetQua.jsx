import {useState} from "react";
import { Button } from "react-bootstrap";
// // true: Hiện tất cả
// // false: Hiện riêng

const KetQua = ({result}) => {
    const [kieuKetQua, setKieuKetQua] = useState([
        '',
        ,'Liên thông',
        'Chu trình',
        'Đường đi ngắn nhất'
      ]);
    const [status, setStatus] = useState(true);
    return ( <div class='Ket-qua'>
        {!status && <>
            <h3>Có n {kieuKetQua[result]}: </h3>
        <div style={{
            margin:20
        }}>
            {<p class='chon'>{kieuKetQua[result]} thứ 1: giá trị </p>}
        </div>
        </>
        }
        {
            status && <>
            <h3>{kieuKetQua[result]} thứ n : </h3>
        <div style={{
            margin:20
        }}>
            <p class='chon'>Nút thứ 1: giá trị </p>
            <p class='chon'>Nút thứ 1: giá trị </p>
        </div>
            </>
        }
        <Button onClick={() => setStatus(!status)}>Quay lại</Button>
    </div> );
}
 
export default KetQua;