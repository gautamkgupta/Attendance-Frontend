import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`

.contact_us_form .row{
    border: 1px solid #000;
    border-radius: 10px;
    padding: 50px 15px;
}
.contact_us_form .row .form-control{
    border: 1px solid #000;
    margin-bottom: 20px;
}
.contact_us h5{
   text-align:center;
   font-weight:600;
   padding: 2em 8em;
}
.contact_row{
    display: flex;
    align-items: center;
    justify-content: center;
}
.contact_row h1{
    text-align:center;
    font-size:30px;
    font-weight:700;
    padding-bottom: 1em;
}
.contact_us_form a{
    background: #114C5F;
    color: #fff !important;
    padding: 10px 40px;
    border-radius: 5px;
}
.contact_col h6{
font-weight: 700;
}
.contact_col p{
    padding-bottom: 15px;

}
.checkbox{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0em 2em 0em;
    gap: 1em;

}
.checkbox p{
  font-size:12px;
  line-height: 12px;
}
.check-col{
    padding-top: 1em;
}
`;

function Register() {
  return (
    <StyledContainer>
        <div className="container contact_us">
            <div className="row contact_row">
                <h1>Register</h1>
               
                <div className="col-md-7 contact_us_form">
                    <div className='row'>
                        <div className='col-md-6'>
                            <label htmlFor="">Name</label> <br />
                            <input className='form-control' type="text" />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor="">Email</label> <br />
                            <input className='form-control' type="text" />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor="">Contact No</label> <br />
                            <input className='form-control' type="text" />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor="">Gender</label> <br />
                            <input className='form-control' type="text" />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor="">City</label> <br />
                            <input className='form-control' type="text" />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor="">State</label> <br />
                            <input className='form-control' type="text" />
                        </div>
                        {/* <div className='col-md-6'>
                            <label htmlFor="">Message</label> <br />
                            <textarea lassName='form-control' name="" id="" cols="30" rows="5"></textarea>
                        </div> */}
                        <div className='col-md-6 check-col'>
                            {/* <div className='checkbox'>
                            <input type="checkbox" />
                                <p>I consent to my data being stored for administrative purposes.</p>
                            </div> */}
                            <a href="">Submit</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StyledContainer>
  )
}

export default Register