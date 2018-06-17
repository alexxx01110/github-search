import React from 'react';

class Detail extends React.Component {
    render() {
        const detail = this.props.detail;
        let repoDetail;
        if (detail.data) {
            repoDetail =
                <pre>
                    {detail.data}
                </pre>
        } else {
            repoDetail =
                <p>
                    {detail.error}
                </p>
        }
        return (
            <section className="detail">
                {repoDetail}
            </section>

        )
    }
}

export default Detail;
