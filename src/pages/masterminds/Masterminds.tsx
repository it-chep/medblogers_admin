import { useState } from "react";
import classes from './masterminds.module.scss'
import { Masterminds } from "../../widgets/masterminds";
import { CreateMastermind } from "../../features/createMastermind";

export default function MastermindsPage() {
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0)

    return (
        <section className={classes.container + ' wrapper_main'}>
            <section className={classes.masterminds_header}>
                <h1>Мастермайнды</h1>
                <CreateMastermind onCreated={() => setRefreshTrigger(prev => prev + 1)} />
            </section>

            <Masterminds refreshTrigger={refreshTrigger} />
        </section>
    )
}
