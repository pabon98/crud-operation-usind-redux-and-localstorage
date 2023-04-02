import React from 'react';

const Navbar = () => {
    return (
        <div className='container'>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">CRUD</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="nav justify-content-center m-auto">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">Pricing</a>
        </li>
       
      </ul>
    </div>
    <div class="d-flex" role="search">
      <img className='rounded-circle' width="50px" height="30px" src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80" alt="" />
    </div>
  </div>
</nav>
        </div>
    );
};

export default Navbar;