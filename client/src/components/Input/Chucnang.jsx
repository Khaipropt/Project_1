import { Button } from "react-bootstrap";
import { useState } from "react";
const ChucNang = () => {
    const [diemDiQua, setDiemDiQua] = useState([]);
    const [diemInput, setDiemInput] = useState('');

    const handleIncrement = () => {
        if (diemInput.trim() !== '' ) {
            setDiemDiQua([...diemDiQua, diemInput]);
            setDiemInput(''); // Reset input field
        } else {
            alert("Vui lòng nhập điểm đi qua!");
        }
    };
    return ( <div class="Chuc-nang">
        <div style={
            {
                height:180,
                // backgroundColor:'red'
            }}>
            <h3>Chức năng :</h3>
            <div style={{
                marginLeft:30,
            }
            }>
                <div style={{ 
                    marginTop:-20,
                    display: 'flex', 
                    marginLeft: 50, 
                    }}>
                
                <input type="radio" id="diem-ket-noi" name='thuc-hien-chuc-nang' />
                <p style={{
                    width:120,
                    marginLeft:50
                }}>Liên thông</p>
                </div>
                <div style={{ 
                    marginTop:-20,
                    display: 'flex', 
                    marginLeft: 50, 
                    }}>
                <input type="radio" id="diem-ket-noi" name='thuc-hien-chuc-nang' />
                <p style={{
                    width:120,
                    marginLeft:50
                }}>Chu trình</p>
                </div>
                <div style={{ 
                    marginTop:-20,
                    display: 'flex', 
                    marginLeft: 50, 
                    }}>
                <input type="radio" id="diem-ket-noi" name='thuc-hien-chuc-nang' />
                <p style={{
                    width:200,
                    marginLeft:50
                }}>Đường đi ngắn nhất</p>
                </div>
                
            </div>
        </div>
        <div style={
            {
                // backgroundColor:'red',
                marginTop:10,
                height:225
            }
        }>
            <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between' 
            }}>
                <h3>Điểm đầu</h3>
                <input type="text" id="nhapChu"  />
            </div>
            <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between' 
            }}>
                <h3>Điểm cuối</h3>
                <input type="text" id="nhapChu"  />
            </div>
            <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between' 
            }}>
                <h3>Điểm đi qua</h3>
                <input type="text" id="nhapChu"
                value={diemInput} 
                onChange={(e) => setDiemInput(e.target.value)}
                />
            </div>
            <div>
                {diemDiQua.map((diem, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>Điểm đi qua</h3>
                        <input type="text"  id="nhapChu" value={diem} readOnly />
                    </div>
                ))}
            </div>
            <Button onClick={handleIncrement}>Thêm điểm</Button>
            <Button style={{
                marginTop:10
            }}>Kết Quả</Button>
        </div>
        
    </div> );
}
 
export default ChucNang;