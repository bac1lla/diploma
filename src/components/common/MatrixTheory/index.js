import React from 'react';
import Latex from "react-latex";
import styles from '../Text/styles.css'

const MatrixTheory = () => {
    return (
        <div style={{
            padding: 50,
            overflow: 'auto'
        }}>
            <h4>Постановка задачи векторной оптимизации.</h4>
            <p className={'vector-theory-text'}>Пусть эффективность операции оценивается не одним, а несколькими
                показателями качества <Latex className={'vector-theory-text'}>{'$g_{1}, g_{2}, ..., g_{n}$'}</Latex>
                (то есть векторным критерием качества <Latex
                    className={'vector-theory-text'}>{'$G=(g_{1}, g_{2}, ..., g_{n})$'}</Latex>), каждый из
                которых можно представить как функцию стратегии <Latex
                    className={'vector-theory-text'}>{'$x=(x_{1}, x_{2}, ..., x_{m})$'}</Latex>.
            </p>
            <p className={'vector-theory-text'}>Требуется найти
                стратегию <Latex className={'vector-theory-text'}>{'$x=(x_{1}, x_{2}, ..., x_{m})$'}</Latex>,
                оптимизирующую все
                показатели качества (векторный критерий качества).
            </p>
            <p className={'vector-theory-text'}>Такая задача называется <span
                className={'vector-theory-text vector-theory-text-blue'}>задачей векторной оптимизации</span></p>
            <br/>
            <p className={'vector-theory-text'}>
                Не любые решения могут сравниваться по заданным показателям <Latex
                className={'vector-theory-text'}>{'$g_{i}$'}</Latex>, например, если
                сравнивать две стратегии
                <Latex className={'vector-theory-text'}>{'$x^1$'}</Latex> и <Latex
                className={'vector-theory-text'}>{'$x^2$'}</Latex>, то по одним
                критериям <Latex className={'vector-theory-text'}>{'$x^1$'}</Latex> может оказаться
                лучше <Latex className={'vector-theory-text'}>{'$x^2$'}</Latex>, а
                по другим - <Latex className={'vector-theory-text'}>{'$x^2$'}</Latex> и <Latex
                className={'vector-theory-text'}>{'$x^1$'}</Latex>
            </p>
            <p className={'vector-theory-text'}>Таким образом, решением задачи векторной оптимизации может быть целое
                множество стретегий, любые две из
                которого либо несравнимы между собой, либо эквивалентны.</p>
            <p className={'vector-theory-text'}>Для определения этого множества необходимо задать отношения предпочтения
                на множестве
                стратегий <Latex className={'vector-theory-text'}>{'$X$'}</Latex></p>
            <h4>Оптимальность по Парето.</h4>
            <p className={'vector-theory-text'}>Для опеределенности, будем расматривать задачу минимизации всех
                критериев.</p>
            <p className={'vector-theory-text'}><i>Определение 1.</i> Решение <Latex>{'$x^*$'}</Latex> называется <span
                className={'vector-theory-text vector-theory-text-blue'}>эффективным или оптимальным по Парето</span> при
                решении задачи минимизации векторного критерия, если на множестве допустимых
                решений <Latex>{'$X$'}</Latex> не существует такого рещения <Latex>{'$x$'}</Latex>, для которого
                выолнялись бы неравенства</p>
            <p className={'vector-theory-text vector-theory-text-center'}>
                <Latex>{'$g_{i}(x) \\leq g_{i}(x^1), i = 1, n$'}</Latex>,</p>
            <p className={'vector-theory-text'}>и хотя бы одно из них было строгим.</p>
            <p className={'vector-theory-text'}>Другими словами, никакое другое решение не может улучшить значение
                некоторых показателей, не ухудшая при этом значений хотя бы одной из оставшихся функций цели.</p>
            <br/>
            <p className={'vector-theory-text'}><i>Определение 2.</i> Решение <Latex>{'$x^*$'}</Latex> называется <span
                className={'vector-theory-text vector-theory-text-blue'}>эффективным или оптимальным по Парето</span> при
                решении задачи минимизации векторного критерия, если из выполнения для
                некоторого <Latex>{'$x$'}</Latex> неравенства</p>
            <p className={'vector-theory-text vector-theory-text-center'}>
                <Latex>{'$G(x) \\leq G(x^*)$'}</Latex> (покомпонентно, то
                есть <Latex>{'$g_{i}(x) \\leq g_{i}(x^*). i = 1, n$'}</Latex>) следует,
                что <Latex>{'$G(x) = G(x^*)$'}</Latex>.</p>
            <p className={'vector-theory-text'}>Множество эффективных (или оптимальных по Парето) решений
                образуют <span className={'vector-theory-text vector-theory-text-blue'}>Область Парето</span> или <span
                    className={'vector-theory-text vector-theory-text-blue'}>Область компромиссных решений</span>.</p>
            <br/>
            <h4>Оптимальность по Слейтеру.</h4>
            <p className={'vector-theory-text'}><i>Определение.</i> Решение <Latex>{'$x^*$'}</Latex> называется <span
                className={'vector-theory-text vector-theory-text-blue'}>оптимальным по Слейтеру</span> при
                решении задачи минимизации векторного критерия, если не существует другого такого
                решения <Latex>{'$x$'}</Latex>, что выполняется неравенство</p>
            <p className={'vector-theory-text vector-theory-text-center'}>
                <Latex>{'$g_{i}(x) < g_{i}(x^1), i = 1, n$'}</Latex>.</p>
        </div>
    );
};

export default MatrixTheory;