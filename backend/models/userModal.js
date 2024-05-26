const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name is necessary"],
            maxLength: [100, "First Name can only be 100 characters long"],
            minLength: [2, "Must be at least 5 characters long"],
        },

        lastName: {
            type: String,
            required: [true, "First Name is necessary"],
            maxLength: [100, "First Name can only be 100 characters long"],
            minLength: [2, "Must be at least 5 characters long"],
        },

        email: {
            type: String,
            required: [true, "An account must have a email"],
            unique: true,
            validate: [isEmail, "Invalid Email"],
        },

        password: {
            type: String,
            match: [
                /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,50}$/,
                "A password must have at least one small letter, one capital letter, one special symbol and must be more than 10 characters long",
            ],
            required: [true, "An account must have a password"],
            //when I query the data, password won't be displayed
            select: false,
        },

        role: {
            type: String,
            required: [true, "A User must have a role"],
            enum: {
                values: ["seller", "buyer"],
            },
        },
    },
    {
        timestamps: true,
    }
);

//1 hash the password
userSchema.pre("save", async function (next) {
    //if the password is not modified
    if (!this.isModified("password")) {
        return next();
    }

    //if the password is created or updated
    this.password = await bcrypt.hash(this.password, 12);
    this.fullName = this.firstName + " " + this.lastName;
    this.passwordConfirm = undefined;
    next();
});

//2 compare the password
userSchema.methods.comparePassword = async function (
    enteredPassword,
    storedPassword
) {
    return await bcrypt.compare(enteredPassword, storedPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
