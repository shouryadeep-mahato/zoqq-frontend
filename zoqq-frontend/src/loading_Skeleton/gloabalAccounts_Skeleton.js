import React from "react";
import Skeleton, { SkeletonTheme }  from "react-loading-skeleton";
import "../loading_Skeleton/Skeleton.css";
import 'react-loading-skeleton/dist/skeleton.css'


function AccountsFetchSkeleton (){

    return(
        <div id="skeleton_Accounts" style={{minWidth: "30%"}}>
        
        <Skeleton circle={true} width={60} height={60} style={{ marginLeft: '-80%', borderRadius: '50%', marginBottom: "50px" }} />
        <h4><Skeleton  width={90} style={{marginLeft: '-72%'}}/></h4>
        <h1><Skeleton height={50}/></h1>
        </div>
       

    )
}

export default AccountsFetchSkeleton