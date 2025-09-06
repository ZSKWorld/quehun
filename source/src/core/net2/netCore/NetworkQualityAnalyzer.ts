
module net {
    // 网络质量分析器：评估当前网络延迟和稳定性（单位：秒）
    // 网络质量：根据当前延迟、历史1分钟内的波动等综合信息来评估
    export class NetworkQualityAnalyzer {
        // 存储最近1分钟的延迟数据点 [timestamp, latency]
        private latency_data: [number, number][] = [];
        // 评分权重配置
        private current_latency_weight = 0.7;
        private stability_weight = 0.3;

        // 创建新的分析器实例
        static new(): NetworkQualityAnalyzer {
            return new NetworkQualityAnalyzer();
        }

        clear(): void {
            this.latency_data = [];
        }

        // 添加新的延迟样本
        add_latency_sample(timestamp: number, latency_sec: number): void {
            this.latency_data.push([timestamp, latency_sec]);

            // 移除超过30秒前的旧数据
            const cutoff_time = timestamp - 30; // 30秒前
            while (this.latency_data.length > 0 && this.latency_data[0][0] < cutoff_time) {
                this.latency_data.shift();
            }
        }

        // 只有30秒的数据，最多60个数据点，取第二大的数字当95百分位数
        calculate_stability_score(): number {
            if (this.latency_data.length === 0) {
                return DELAY_INF;
            }

            let max0 = this.latency_data[0][1];
            let max1 = this.latency_data[0][1];
            for (let i = 1; i < this.latency_data.length; i++) {
                const latency = this.latency_data[i][1];
                if (latency >= max0) {
                    max1 = max0;
                    max0 = latency;
                } else if (latency >= max1) {
                    max1 = latency;
                }
            }
            return max1;
        }

        // 获取网络质量评分
        get_network_quality(): number {
            if (this.latency_data.length === 0) {
                return DELAY_INF;
            }

            const count = this.latency_data.length;
            let latency = 0;
            let rate = 0;

            for (let i = 0; i < 10; i++) {
                if (count - i - 1 < 0) break;
                const _rate = 1.0 / (i + 1);
                latency += this.latency_data[count - i - 1][1] * _rate;
                rate += _rate;
            }

            // 计算各项评分
            const current_score = latency / rate; // 5s内的加权平均
            const stability_score = this.calculate_stability_score();

            // 计算综合评分
            const quality_score = (current_score * this.current_latency_weight + stability_score * this.stability_weight) / (this.current_latency_weight + this.stability_weight);

            return quality_score;
        }
    }


}