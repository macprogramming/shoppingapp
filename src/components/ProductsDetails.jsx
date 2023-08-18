import React from "react";
import Modal from 'react-bootstrap/Modal';
import { AiFillStar, AiOutlineHeart, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
const ProducstDetails = ({handleClose ,productData, productRaings, open}) => {
  return(
    <>
      <Modal show={open} onHide={handleClose} size="lg">
        <Modal.Header closeButton />
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src={productData.image} class="d-block w-100" alt="..." />
                </div>
              </div>
            </div>
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold">{productData.title}</h2>
              <h5 className="text-secondary">&#8377;&nbsp;{productData.price}</h5>
              {
                productRaings.map((rating, i) => {
                  return(
                    <>
                      <AiFillStar key={i} fontSize={'18px'} color="yellow" />
                    </>
                  )
                })
              }&nbsp;&nbsp;&nbsp;( { Math.round(productData.rating.rate) }&nbsp;Reviews )
              <p className="m-0 py-2">{productData.description}</p>
              <div class="row my-3">
                <div className="col-md-4">
                  <div className="badge rounded-pill bg-light text-dark m-0">
                    <div className="d-flex justify-content-between ">
                      <buttont type="button" className="btn btn-sm border-0 btn-light w-100"><AiOutlineMinus /></buttont>
                      <input className="form-control border-0 rounded-0"/>
                      <buttont type="button" className="btn btn-sm border-0 bg-light w-100"><AiOutlinePlus /></buttont>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <button type="button" className="btn btn-md btn-custom-primary">Add To Cart</button>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <a><AiOutlineHeart />&nbsp;Add to Wishlist</a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <span className="fw-bold">Social Share : </span>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProducstDetails;
