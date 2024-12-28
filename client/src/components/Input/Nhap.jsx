import { Button } from "react-bootstrap";

const Nhap = () => {

    return ( <div class="Nhap">
        <div style={
            {
                height:180,
                // backgroundColor:'red'
            }}>
            <h3>Loại đồ thị</h3>
            <div style={{
                marginLeft:30,
            }
            }>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between' 
                    }}>
                <p style={{
                    width:120
                }}>Hướng :</p>
                <input type="radio" id="diem-ket-noi" name='huong' />
                <p>Có</p>
                <input type="radio" id="diem-ket-noi" name='huong' />
                <p>Không</p>
                </div>
                
            <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between' 
                    }}>
                <p style={{
                    width:120
                }}>Trọng số :</p>
                <input type="radio" id="diem-ket-noi" name='trong-so' />
                <p>Có</p>
                <input type="radio" id="diem-ket-noi" name='trong-so' />
                <p>Không</p>
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
                <input type="text" id="nhapChu" onChange={(e) => alert(e.target.value)} />
            </div>
                <div style={{
                        marginLeft:10
                    }}>
                    <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between' 
            }}>
                        <p style={{
                            width:150
                        }}>Kết nối: </p>
                        <input type="radio" id="diem-ket-noi" name='ket-noi' />
                        <p>Có</p>
                        <input type="radio" id="diem-ket-noi" name='ket-noi' />
                        <p>Không</p>
                    </div>
                    
                    <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between' 
                    }}>
                        <p>Điểm kết nối</p>
                        <input type="text" id="nhapChu"  />
                    </div>

                    <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between' 
                    }}>
                        <p>Giá trị</p>
                        <input type="text" id="nhapChu"  />
                    </div>
                </div>    
        </div>
        <Button>Kết Quả</Button>
    </div> );
}
 
export default Nhap;