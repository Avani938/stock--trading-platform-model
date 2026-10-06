import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1 style={{ fontSize: "2rem", fontWeight: "500", color: "#424242" }}>
          The Zerodha Universe
        </h1>

        <p style={{ color: "#666", marginBottom: "20px" }}>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div
          className="col-4"
          style={{ padding: "40px 35px 10px", marginTop: "35px" }}
        >
          <img
            src="media/zerodhaFundhouse.png"
            alt="Zerodha Fund House"
            style={{
              width: "180px",
              height: "70px",
              objectFit: "contain",
              marginBottom: "20px",
            }}
          />
          <p
            className="text-muted"
            style={{
              fontSize: "0.95rem",
              lineHeight: "1.6",
              maxWidth: "360px",
              margin: "0 auto",
            }}
          >
            Our asset management venture that is creating simple and
            transparent index funds to help you save for your goals.
          </p>
        </div>

        <div
          className="col-4"
          style={{ padding: "40px 35px 10px", marginTop: "35px" }}
        >
          <img
            src="media/sensibullLogo.svg"
            alt="Sensibull"
            style={{
              width: "180px",
              height: "70px",
              objectFit: "contain",
              marginBottom: "20px",
            }}
          />
          <p
            className="text-muted"
            style={{
              fontSize: "0.95rem",
              lineHeight: "1.6",
              maxWidth: "360px",
              margin: "0 auto",
            }}
          >
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII,
            and more.
          </p>
        </div>

        <div
          className="col-4"
          style={{ padding: "40px 35px 10px", marginTop: "35px" }}
        >
          <img
            src="media/tijori.svg"
            alt="Tijori"
            style={{
              width: "180px",
              height: "70px",
              objectFit: "contain",
              marginBottom: "20px",
            }}
          />
          <p
            className="text-muted"
            style={{
              fontSize: "0.95rem",
              lineHeight: "1.6",
              maxWidth: "360px",
              margin: "0 auto",
            }}
          >
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>

        <div
          className="col-4"
          style={{ padding: "40px 35px 10px", marginTop: "35px" }}
        >
          <img
            src="media/streakLogo.png"
            alt="Streak"
            style={{
              width: "180px",
              height: "70px",
              objectFit: "contain",
              marginBottom: "20px",
            }}
          />
          <p
            className="text-muted"
            style={{
              fontSize: "0.95rem",
              lineHeight: "1.6",
              maxWidth: "360px",
              margin: "0 auto",
            }}
          >
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>

        <div
          className="col-4"
          style={{ padding: "40px 35px 10px", marginTop: "35px" }}
        >
          <img
            src="media/smallcaseLogo.png"
            alt="Smallcase"
            style={{
              width: "180px",
              height: "70px",
              objectFit: "contain",
              marginBottom: "20px",
            }}
          />
          <p
            className="text-muted"
            style={{
              fontSize: "0.95rem",
              lineHeight: "1.6",
              maxWidth: "360px",
              margin: "0 auto",
            }}
          >
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>

        <div
          className="col-4"
          style={{ padding: "40px 35px 10px", marginTop: "35px" }}
        >
          <img
            src="media/dittoLogo.png"
            alt="Ditto"
            style={{
              width: "180px",
              height: "70px",
              objectFit: "contain",
              marginBottom: "20px",
            }}
          />
          <p
            className="text-muted"
            style={{
              fontSize: "0.95rem",
              lineHeight: "1.6",
              maxWidth: "360px",
              margin: "0 auto",
            }}
          >
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>

        <button
          className="p-2 btn btn-primary fs-5"
          style={{
            width: "180px",
            margin: "50px auto 60px",
            border: "none",
          }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;