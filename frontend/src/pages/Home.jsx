import React, { useEffect, useState } from 'react';
import RecentPost from '../Components/RecentPost';
import { get } from '../services/Endpoint';

export default function Home() {

  return (
    <>
      <div className="container-fluid bg-dark hero-section text-center">
        <h1 className="fs-1 fw-bold text-light">Turning thoughts into timeless Stories.</h1>
        <p className="text-light fs-5 mt-3">
          Thoughts are limitless, ideas are endless. All it takes is one blog to spark Inspiration.
        </p>
      </div>

<div className='container-fluid  p-5'>

 <RecentPost />

</div>
    </>
  );
}