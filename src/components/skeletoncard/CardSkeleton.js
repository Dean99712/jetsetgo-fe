import React from 'react';
import Skeleton from "react-loading-skeleton";
import "./CardSkeleton.scss";

const CardSkeleton = ({cards}) => {
    return (
        Array(cards).fill(0).map((_, i) =>
            <div key={i} className="card-skeleton">
                <div className="card-skeleton-container">

                    <div className="items-container" id="carrier">
                        <Skeleton circle height={50} width={50}/>
                        <p><Skeleton count={1} width={200}/></p>
                    </div>

                    <div className="items-container">
                        <p><Skeleton count={1} width={75}/></p>
                        <p><Skeleton count={1} width={100}/></p>
                        <p><Skeleton count={1} width={50}/></p>
                    </div>

                    <div className="items-container">
                        <Skeleton count={1} width={100} containerClassName={'items-container'}/>
                        <Skeleton count={1} width={75} containerClassName={'items-container'}/>
                        <Skeleton count={1} width={200} containerClassName={'items-container'}/>
                    </div>

                    <div className="items-container">
                        <p><Skeleton count={1} width={75}/></p>
                        <p><Skeleton count={1} width={100}/></p>
                        <p><Skeleton count={1} width={50}/></p>
                    </div>


                    <div className="items-container" id="price">
                        <p><Skeleton count={1} width={75}/></p>
                        <p><Skeleton count={1} width={125}/></p>
                        <Skeleton className="button" width={142} height={40} borderRadius={10}/>
                    </div>
                </div>
            </div>)

    );

};

export default CardSkeleton;
