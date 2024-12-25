import BoxGraph from "../components/BoxGraph";
import BoxText from "../components/BoxText";

const GraphDraw = () => {
    return ( <>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <BoxGraph/>
        <BoxText/>
    </div>
    </>
     );
}
 
export default GraphDraw;

{/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ForceGraph/>
            <BoxText/>
        </div> */}