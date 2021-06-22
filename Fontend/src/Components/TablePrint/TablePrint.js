import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const TablePrint = ({ bsells, so, dsr, componentref, bill_number }) => {
  // ----------------------- abu Horain - added -----------------------
  const [payments, setPayments] = useState([]);
  const [paymentNext, setPaymentNext] = useState({});
  const [validBill, setValidBill] = useState();
  const [products, setProducts] = useState();
  const [reports, setReports] = useState([]);
  const [reportNext, setReportNext] = useState({});

  let total_price = 0;
  for (let i = 0; i < bsells.length; i++) {
    total_price += bsells[i].total;
  }
  total_price = Math.round(total_price);
  // console.log(
  //   "to Table print ",
  //   bsells,
  //   ",",
  //   so,
  //   ",",
  //   dsr,
  //   ",",
  //   componentref,
  //   ",",
  //   bill_number,
  //   ",",
  //   total_price,
  //   ","
  // );

  useEffect(() => {
    axios
      .get(
        "https://murmuring-hollows-53734.herokuapp.com/pendingOrder/pen-read-all"
      )
      .then((res) => {
        // ------- check valid bill_number ----------
        const { penProduct, error, token, message } = res.data;
        const valid = penProduct.find((pen) => pen.bill_number == bill_number);
        setValidBill(valid);
        // ------- filter products ------------
        const pro = penProduct.filter((pen) => pen.bill_number == bill_number);
        // console.log("products == ", pro);
        const prods = [];
        for (let i = 0; i < pro.length; i++) {
          const pName = pro[i].sell_product_name;
          prods.push(pName);
          // console.log("prods", prods);
        }
        setProducts(prods);
      })
      .catch((err) => {
        console.log(err.response?.data.message);
        // // alert(err.response?.data.message);
      });
  }, [bill_number]);

  // ------------------------ Sell Report -----------------------------
  useEffect(() => {
    // --------------------- Sell Report Read All ---------------------
    axios
      .get(
        "https://murmuring-hollows-53734.herokuapp.com/sell-report/rep-read-all"
      )
      .then((res) => {
        const { report, error, token, message } = res.data;
        setReports(report);
      })
      .catch((err) => {
        console.log(err.response?.data.message);
        // alert(err.response?.data.message);
      });

    const result = reports.find((rep) => rep.bill_number == bill_number);

    if (result && validBill && products) {
      const info = {
        bill_number,
        so,
        dsr,
        products,
        total_amount: total_price,
      };
      axios
        .patch(
          `https://murmuring-hollows-53734.herokuapp.com/sell-report/rep-update-one/${result._id}`,
          info
        )
        .then((res) => {
          const { report, error, token, message } = res.data;
          setReportNext(report);
          // alert(message);
        })
        .catch((err) => {
          console.log(err.response?.data.message);
          // alert(err.response?.data.message);
        });
    }
    if (!result && validBill && products) {
      const info = {
        bill_number,
        so,
        dsr,
        products,
        total_amount: total_price,
      };

      axios
        .post(
          `https://murmuring-hollows-53734.herokuapp.com/sell-report/rep-create`,
          info
        )
        .then((res) => {
          const { report, error, token, message } = res.data;
          setReportNext(report);
          // alert(message);
        })
        .catch((err) => {
          console.log(err.response?.data.message);
          // alert(err.response?.data.message);
        });
    }
  }, [validBill, products, total_price]);

  // ------------------------- Payment ------------------------
  useEffect(() => {
    // ------------------------- Payment read all ------------------------
    axios
      .get("https://murmuring-hollows-53734.herokuapp.com/payment/pay-read-all")
      .then((res) => {
        const { payment, error, token, message } = res.data;
        setPayments(payment);
      })
      .catch((err) => {
        console.log(err.response?.data.message);
        // alert(err.response?.data.message);
      });

    const result_2 = payments.find((pay) => pay.bill_number == bill_number);

    if (result_2 && validBill && total_price > 0) {
      const info = {
        bill_number,
        so,
        dsr,
        total_amount: total_price,
      };
      axios
        .patch(
          `https://murmuring-hollows-53734.herokuapp.com/payment/pay-update-one/${result_2._id}`,
          info
        )
        .then((res) => {
          const { payment, error, token, message } = res.data;
          setPaymentNext(payment);
          // alert(message);
        })
        .catch((err) => {
          console.log(err.response?.data.message);
          // alert(err.response?.data.message);
        });
    }
    if (!result_2 && validBill) {
      const info = {
        bill_number,
        so,
        dsr,
        total_amount: total_price,
        payment: 0,
      };
      axios
        .post(
          `https://murmuring-hollows-53734.herokuapp.com/payment/pay-create`,
          info
        )
        .then((res) => {
          const { payment, error, token, message } = res.data;
          setPaymentNext(payment);
          // alert(message);
        })
        .catch((err) => {
          console.log(err.response?.data.message);
          // alert(err.response?.data.message);
        });
    }
  }, [validBill, total_price]);

  return (
    <div className="print_div">
      <div className="print_inner-div m-3" ref={componentref}>
        <h2 className="text-center pt-1 py-4 mt-5 print_title_">
          DAILY ORDER SIT - {bill_number}
        </h2>
        <Table className="table-responsive"striped bordered hover size="sm">
          <thead>
            <tr id="sub_title_bar">
              <th>{null}</th>
              <th>PANY TANG</th>
              <th>SO Name</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Order Quantity</th>
              <th>Sell Quantity</th>
              <th>Discount</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <thead>
            <tr id="table_tr">
              <th>No</th>
              <th>Company Name</th>
              <th>Product Code</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Order Quantity</th>
              <th>Sell Quantity</th>
              <th>Discount</th>
              <th>Sub Total</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody id="tbody_">
            {bsells.map((info, index) => (
              <tr key={info._id}>
                <td>{index + 1}</td>
                <td style={{ textAlign: "left" }}>{info.sell_company_name}</td>
                <td>{info.sell_product_code}</td>
                <td>{info.sell_product_name}</td>
                <td>{info.sell_product_price}</td>
                <td>{info.sell_order_quantity}</td>
                <td>{info.sell_sell_quantity}</td>
                <td>{info.sell_discount}%</td>
                <td className="text-right">{info.sub_total}</td>
                <td className="text-right">{info.total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="total_div">
          <div className="inner_div">
            <table className="table-responsive" id="baki_table">
              <tr>
                <td>baki</td>
                <td></td>
              </tr>
              <tr>
                <td> </td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td> </td>
                <td> </td>
              </tr>
              <tr>
                <td> </td>
                <td></td>
              </tr>
            </table>
          </div>
          <div className="inner_div ml-auto">
            <div className="price_div bg-light">
              <p>{total_price}</p>
              <p>0.00</p>
              <p>0.00</p>
            </div>
            <div className="price_div">
              <p>TAKA</p>
              <p>ex rate</p>
              <p>COM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePrint;
