<template>
  <div style="width: 100%">
    <div class="card-center">
      <v-card class="" max-width="500">
        <v-img height="250" src="/img/banner-min.jpg"></v-img>

        <v-card-title>Login</v-card-title>

        <v-card-text>
          <template>
            <form>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-text-field
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                v-model="password"
                :error-messages="passwordErrors"
                :counter="16"
                label="Password"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-card-actions>
                <v-btn class="teal darken-4" dark @click="submit">
                  Login
                </v-btn>
              </v-card-actions>
            </form>
          </template>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  minLength,
  maxLength,
  email
} from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(16) }
  },

  data: () => ({
    email: '',
    password: '',
    show1: false,
    isAuthenticated: false
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Must be valid e-mail');
      !this.$v.email.required && errors.push('E-mail is required');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push('Password must be 8 characters long minimum');
      !this.$v.password.maxLength &&
        errors.push('Password must be 16 characters long minimum');
      !this.$v.password.required && errors.push('Password is required.');
      return errors;
    }
  },

  methods: {
    async submit() {
      this.$v.$touch();
      var payload = {
        Email: this.email,
        Password: this.password
      };
      await this.$store
        .dispatch('login', payload)
        .then(() => {
          var adminId = window.localStorage.getItem('beAware-Admin-userId');
          if (adminId != null || adminId != undefined) {
            this.$router.push({ name: 'news' });
          }
        })
        .catch((ex) => {
          console.log(ex);
        });
    },
    clear() {
      this.$v.$reset();
      this.email = '';
      this.password = '';
    },
    async handleIsAuthenticated() {
      await this.$store
        .dispatch(
          'handleIsAuthenticated',
          window.localStorage.getItem('isLoggedInAdminBeAware')
        )
        .then(() => {
          this.isAuthenticated =
            this.getIsAuthenticated === null ? false : this.getIsAuthenticated;
        });
    }
  },
  mounted() {
    this.handleIsAuthenticated().then(() => {
      if (this.isAuthenticated) {
        this.$$router.push({ name: 'login' });
      }
    });
  },
  computed: {
    ...mapGetters(['getIsAuthenticated'])
  }
};
</script>

<style scoped>
.card-center {
  display: flex;
  justify-content: center;
  padding-top: 10rem;
  font-family: 'Roboto', sans-serif;
}
</style>
