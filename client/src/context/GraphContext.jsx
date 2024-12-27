import { Children, createContext, useEffect, useState } from "react";
export const GraphContext = createContext();

export const GraphContextProvider = ({children}) => {
    const [graphData, setGraphData] = useState({
        nodes: [
          { id: 'A' },
          { id: 'B' },
          { id: 'C' },
          { id: 'D' },
        ],
        links: [
          { source: 'A', target: 'B' },
          { source: 'A', target: 'C' },
          { source: 'B', target: 'D' },
          { source: 'C', target: 'D' },
        ],
      });

    
    return ( <GraphContext.Provider value={{
        graphData,
    }}>
        {{children}}
    </GraphContext.Provider> );
}