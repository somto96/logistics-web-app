"use client"

import React from 'react';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';

const RiderBottomSheet: React.FC<any> = ()=>{

    const sheetRef = React.createRef<BottomSheetRef>()

    return(
        <BottomSheet 
            open 
            snapPoints={()=> 200}
            blocking={false}
        >
            <p>
            My awesome content here
            </p>
        </BottomSheet>
    )
}

export default RiderBottomSheet;