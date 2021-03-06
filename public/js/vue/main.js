/** -----------------------------------------------------------------------
 * @module [TMC_Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.1.0 [APG 2022/06/11]
 * -----------------------------------------------------------------------
 */
const { createApp } = Vue;

const app = createApp(
    {
        data() {
            return {
                title: 'Team Macinacapre',
                debug: false,
                state: {}
            }
        },
        methods: {
            async fetchData() {
                const response = await fetch("/api/data");
                this.state = await response.json();
            },

            reserveSeat() {

            }
        },
        created() {
            this.fetchData();
        },
        computed: {

        }
    }
)
