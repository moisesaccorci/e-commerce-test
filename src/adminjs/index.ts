import AdminJS from "adminjs";
import AdminJSExpress from '@adminjs/express'
import AdminJSSequelize from '@adminjs/sequelize'
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { Category, Product, User } from "../models";
import bcrypt from "bcrypt"



AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
    databases: [sequelize],
    rootPath: '/admin',
    resources: adminJsResources,
    dashboard: {
        component: AdminJS.bundle('../adminjs/components/Dashboard'),
        handler: async (req, res, context) => {
            const category = await Category.count()
            const product = await Product.count()
            const standardUsers = await User.count({ where: { role: 'user' } })
      
            res.json({
              'Categories': category,
              'Products': product,
              'Users': standardUsers
            })
          },
    },
    branding: {
        companyName: 'TS-Prototype',
        logo: '/lmwflix.png',
        theme: {
            colors: {
                primary100: '#ff0043',
                primary80: '#ff1a57',
                primary60: '#ff3369',
                primary40: '#ff4d7c',
                primary20: '#ff668f',
                grey100: '#151515',
                grey80: '#333333',
                grey60: '#4d4d4d',
                grey40: '#666666',
                grey20: '#dddddd',
                filterBg: '#333333',
                accent: '#151515',
                hoverBg: '#151515',
            }
        }
    }
})

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        const user = await User.findOne({ where: { email } })


        if (user && user.role === 'admin') {
            const matched = await bcrypt.compare(password, user.password)

            if (matched) {
                return user
            }
        }
        return false
    },
    cookiePassword: 'cookieSenha'
}, null, {
    resave: false,
    saveUninitialized: false
})

// Router for development issues
// export const adminJsRouter = AdminJSExpress.buildRouter(adminJs)