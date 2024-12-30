import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import {Container, Button} from "react-bootstrap"
import Nhap from "../components/Input/Nhap";
import ChucNang from "../components/Input/Chucnang";
import KetQua from '../components/Input/KetQua';
import BoxText from "../components/BoxText";

const GraphDraw = () => {
        const [data, setData] = useState(JSON.parse(localStorage.getItem("Graph")));
        const [statusBoxText, setStatusBoxText] = useState(false); // boxtext
        const [ketQua, setKetQua] = useState(1);
        const [kieuKetQua, setKieuKetQua] = useState([
      '',
      ,'liên thông',
      'chu trình',
      'đường đi ngắn nhất'
    ]);
    const [statusKetQua, setStatusKetQua] = useState(true);

    //Ham chuc nang

    const changeStatusBoxText = async (e) => {
        await setStatusBoxText(e);
      };

    return ( <>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* BoxGraph */}
        <div class="box-graph">
        <ForceGraph2D
        graphData={data}
        nodeAutoColorBy="id"
        linkDirectionalParticles={1} // Hiệu ứng hạt cho các liên kết
        linkDirectionalParticleSpeed={d => d.value * 0.001} // Tốc độ hạt
         />
        </div> 

        {/* Boxtext */}
        <div class = "box-text">
          {!(ketQua-1) && 
          <>
          <Container style={{ 
            display: 'flex', 
            justifyContent: 'space-between' 
            }}>
            <h1 class="bt-h1-1" onClick={() => changeStatusBoxText(true)}>Nhập</h1>
            <h1 class="bt-h1-1" onClick={() => changeStatusBoxText(false)}>Chức năng</h1>
          </Container>
          <Container style={{
            marginLeft:20
          }}>
            {
              statusBoxText ? 
            //   <Nhap/>
            
                <div class="Nhap">
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
                </div>
            
               : 
                // Chucnang
                
                <div class="Chuc-nang">
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
                
            </div>                    

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
                {/* KetQua */}
                <div class='Ket-qua'>
                {!statusKetQua && <>
                    <h3>Có n {kieuKetQua[ketQua]}: </h3>
                <div style={{
                    margin:20
                }}>
                    {<p class='chon'>{kieuKetQua[ketQua]} thứ 1: giá trị </p>}
                </div>
                </>
                }
                {
                    statusKetQua && <>
                    <h3>{kieuKetQua[ketQua]} thứ n : </h3>
                <div style={{
                    margin:20
                }}>
                    <p class='chon'>Nút thứ 1: giá trị </p>
                    <p class='chon'>Nút thứ 1: giá trị </p>
                </div>
                    </>
                }
                <Button onClick={() => setStatusKetQua(!statusKetQua)}>Quay lại</Button>
            </div>
           
          </Container>
          </>}
        </div>
    </div>
    </>
     );
}
 
export default GraphDraw;
