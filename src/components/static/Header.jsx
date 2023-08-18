import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineSearch, AiOutlineHeart, AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import cartModal from "../cartModal";
import { removeProduct } from "../../redux/slice/cartDataSlice";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isMinus, setIsMinus] = useState(false);
  let [cartCount, setCartcount] = useState([1,1,1,1,1,1,1,1,1,1]);
  const [total, setTotal] = useState(null);
  const [dollerPrice, setDollerPrice] = useState(74);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => {
    return state.cartData;
  })
  let arrPrice = [];
  cartData.filter((data, i) => {
    arrPrice.push(parseInt(data.price) * cartCount[i])
  })
  let totalPrice;
  if(arrPrice.length > 0) {
    totalPrice = arrPrice.reduce((a,b) => {
      return a + b
    });
  }
  const deleteProduct = (index) => {
    dispatch(removeProduct(index))
  }
  const addition = (i) => {
    setIsAdd(!isAdd)
    let countArr = cartCount;
    if(cartCount.indexOf(i)) {
      countArr[i] = countArr[i] + 1;
      setCartcount(countArr)
    }
  }
  const substraction = (i) => {
    setIsMinus(!isMinus)
    let countArr = cartCount;
    if(cartCount.indexOf(i)) {
      countArr[i] = countArr[i] - 1;
      setCartcount(countArr)
    }
  }
  return(
    <>
      <nav className="py-4 px-5 navbar-expand-lg navbar-light bg-cust-primary">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="d-flex justify-content-between">
                <small className="navbar-brand h6" href="javascript:void(0)">Welcome to Proshop store</small>&nbsp;|&nbsp;
                <small className="navbar-brand h6" href="javascript:void(0)">Track Your Order</small>&nbsp;|&nbsp;
                <small className="navbar-brand h6" href="javascript:void(0)">prostore@gmail.com</small>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-5 sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand h1" href="javascript:void(0)"><AiOutlineShoppingCart />&nbsp;Proshop Store</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink to='/' activeClassName="active" className="px-3 nav-link">Home</NavLink>
              </li>
              <li className="nav-item">
              <NavLink to='/shop' activeClassName="active" className="px-3 nav-link">Shop</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/about' activeClassName="active" className="px-3 nav-link">About Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/contact' activeClassName="active" className="px-3 nav-link">Contact Us</NavLink>
              </li>
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown link
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li> */}
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to='/home' activeClassName="active" className="px-3 nav-link">
                  <AiOutlineSearch fontSize={'25px'} />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/shop' activeClassName="active" className="px-3 nav-link">
                  <AiOutlineUser fontSize={'25px'} />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/about' activeClassName="active" className="px-3 nav-link">
                  <AiOutlineHeart fontSize={'25px'} />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='' activeClassName="active" className="px-3 nav-link">
                  <a className="position-relative" href='javascript:void(0)' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <AiOutlineShoppingCart color="#ee2761" fontSize={'25px'} />
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill btn-custom-primary">
                      {cartData.length}
                    </span>
                  </a>
                </NavLink>
              </li>
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown link
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 id="offcanvasRightLabel">Shopping Cart<br />
          <small className="m-0 text-secondary">Clothing and fashion products are limited</small>
          </h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div className="row">
            <div className="col-12">
              {
                cartData !== null && cartData.length > 0 ?
                cartData.map((product, i) => {
                  // let {total} = total;
                  let dollars = parseInt(product.price);
                  var rupees = dollars * 74;
                  // setTotal = rupees * cartCount[i];
                  return(
                    <div class="card mb-3" key={i}>
                      <div className="card-body">
                        <div class="row g-0">
                          <div class="col-md-3">
                            <img src={product.image} style={{ height: '100px' }} class="img-fluid rounded-start py-3" alt="..." />
                          </div>
                          <div class="col-md-9">
                            <div class="card-body">
                              <h5 class="card-title">{product.title}</h5>
                              <h6 className="card-title">&#8377;&nbsp;{rupees * cartCount[i]}</h6>
                              <div className="row align-items-center d-flex">
                                <div className="col-7">
                                  <div className="badge rounded-pill bg-light text-dark m-0">
                                    <div className="d-flex justify-content-between ">
                                      <buttont type="button" className={cartCount[i] !== 1 ? 'btn btn-sm border-0 btn-light w-100' : 'btn btn-sm border-0 btn-light w-100 disabled' } onClick={ () => substraction(i)}><AiOutlineMinus /></buttont>
                                      <input className="form-control border-0 rounded-0 bg-white" value={cartCount[i]} disabled />
                                      <buttont type="button" className="btn btn-sm border-0 bg-light w-100" onClick={ () => addition(i)}><AiOutlinePlus /></buttont>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <a href="javascript:void(0)" className="text-danger" onClick={ () => deleteProduct(i)}><AiOutlineDelete fontSize={'18px'} /></a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }) : 
                <div className="row"><hr />
                  <div className="col-12 d-flex justify-content-center align-items-center text-center">
                    <div>
                      <AiOutlineShoppingCart fontSize={'100px'} />
                      <h4>Your Cart is empty</h4>
                      <p>Add something to make me happy</p>
                      <button type="button" className="btn btn-sm btn-custom-primary">Continue Shopping</button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div class="offcanvas-footer px-4 pt-4 bg-light">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between">
                <p>Subtotal :</p>
                <h5 className="fw-bold">&#8377;&nbsp;{Math.round(totalPrice) * dollerPrice}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;