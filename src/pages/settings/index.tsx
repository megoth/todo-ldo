import Layout from "@/components/layout";
import DeleteAppDataButton from "@/components/deleteAppDataButton";

export default function SettingsPage() {
    return (
        <Layout>
            <h1 className="title">Settings</h1>
            <p>Work in progress</p>
            <hr />
            <h2 className="subtitle">Delete app data</h2>
            <DeleteAppDataButton />
        </Layout>
    )
}