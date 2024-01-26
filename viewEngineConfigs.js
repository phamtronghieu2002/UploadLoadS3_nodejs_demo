export default function viewEngineConfig(app) {

    app.set('views', "./src/views")
    app.set('view engine', 'ejs')
}