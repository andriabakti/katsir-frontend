<template>
  <div class="container-fluid">
    <div class="row no-gutters">
      <div class="col-lg-6 left">
        <div class="brand">
          <span class="name" @click="toLanding">Katsir</span>
        </div>
      </div>
      <div class="col-lg-6 main">
        <form>
          <h3 class="title">Register</h3>
          <div class="form-group">
            <label for="email">Your email</label>
            <input
              type="email"
              id="email"
              class="form-control"
              v-model="email"
              placeholder="Type here"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Your password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="password"
              placeholder="Type here"
              required
            />
          </div>
          <div class="form-group">
            <label for="username">Your username</label>
            <input
              type="text"
              id="usename"
              class="form-control"
              v-model="username"
              placeholder="Type here"
              required
            />
          </div>
          <div class="submit">
            <button type="submit" class="btn" @click="handleRegister">Register</button>
            <span>Already have an account?</span>
            <div>
              <span>Login</span>
              <span class="link" @click="toLogin">"here"</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// package: vuex
import { mapActions } from "vuex";

export default {
  metaInfo: {
    title: "Register",
    titleTemplate: "%s - Katsir",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  name: "PageRegister",
  data: () => {
    return {
      email: "",
      password: "",
      username: "",
    };
  },
  methods: {
    ...mapActions(["register"]),
    handleRegister(e) {
      e.preventDefault();
      const data = {
        email: this.email,
        password: this.password,
        username: this.username,
        role: 2,
      };
      this.register(data)
        .then(() => {
          this.$router.push("/login");
          Vue.$toast.success("New cashier registered successfully");
        })
        .catch(() => {
          Vue.$toast.error("Failed to register new cashier");
        });
    },
    toLogin() {
      this.$router.push("/login");
    },
    toLanding() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Background */
.row {
  height: 100vh;
  background-image: url("@/assets/images/BgAuth.jpg");
  background-size: cover;
}
@media screen and (max-width: 1000px) {
  .row {
    height: max-content;
  }
}

/* Left Side */
.left {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0 20px;
}
@media screen and (max-width: 1000px) {
  .left {
    padding: 50px 0 20px;
  }
}
@media screen and (max-width: 540px) {
  .left {
    background-image: url("@/assets/images/BgAuth.jpg");
    background-size: cover;
  }
}
/* Brand */
.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.name {
  color: #ffffff;
  font-weight: bold;
  font-size: 50px;
  padding: 15px;
  border: 7px solid #ffffff;
  cursor: pointer;
}
.sub {
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  margin-top: 20px;
  text-align: center;
}
@media screen and (max-width: 540px) {
  .sub {
    padding: 0 20px;
  }
}

/* Right Side */
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/* Box Body */
form {
  width: 400px;
  padding: 30px 35px;
  border-radius: 20px;
  box-shadow: 0 4px 7px rgb(0, 0, 0, 0.3);
  background-color: #ffffff;
}
@media screen and (max-width: 1000px) {
  form {
    margin-bottom: 60px;
  }
}
@media screen and (max-width: 540px) {
  form {
    width: 100%;
    height: 100%;
    margin-bottom: 0;
    padding: 30px 35px 70px;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

/* Box Title */
.title {
  color: cornflowerblue;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}
/* Form Label */
label {
  font-weight: 700;
}

/* Submit & Login */
.submit {
  text-align: right;
}
.submit button {
  /* Button */
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 15px;
  background-color: cornflowerblue;
  margin: 30px 0;
  /* Button Text */
  font-weight: 700;
  color: #ffffff;
}
.link {
  color: cornflowerblue;
  cursor: pointer;
  font-weight: 700;
}
</style>
