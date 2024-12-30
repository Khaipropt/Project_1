import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { GraphContext } from "../../context/GraphContext";
const ChucNang = () => {
    
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
            <Button style={{
                marginTop:10
            }}>Kết Quả</Button>
        </div>
        
    </div> );
}
 
export default ChucNang;