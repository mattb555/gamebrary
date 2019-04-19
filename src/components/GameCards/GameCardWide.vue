<template lang="html">
    <div v-if="gameId && games[gameId]" :class="gameCardClass">
        <img :src="coverUrl" @click="openDetails" :alt="game.name">

        <div class="game-info">
            <a v-text="game.name" @click="openDetails" v-if="list.view !== 'covers'" />

            <i class="fas fa-grip-vertical game-drag-handle" />

            <game-rating
                v-if="showGameRatings"
                :rating="game.rating"
                small
                @click.native="openDetails"
            />

            <i class="fas fa-tag tags" @click="openTags" v-if="hasTags" />

            <div class="game-tags" v-if="hasTags">
                <div
                    v-for="({ games, hex }, name) in tags"
                    :key="name"
                    v-if="games.includes(game.id)"
                >
                    <button
                        class="tag small"
                        :style="`background-color: ${hex}`"
                        v-if="games.includes(game.id)"
                        @click="openTags"
                    >
                        {{ name }}
                    </button>
                </div>
            </div>

            <i
                class="far fa-trash-alt delete-game"
                v-if="list.games.includes(gameId)"
                title="Delete game"
                @click="removeGame"
            />
        </div>
    </div>
</template>

<script>
import GameRating from '@/components/GameDetail/GameRating';
import GameCardUtils from '@/components/GameCards/GameCard';

export default {
    components: {
        GameRating,
    },

    mixins: [GameCardUtils],
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/styles.scss";

    .game-card {
        background-color: $color-white;
        margin-top: $gp / 2;
        position: relative;
        display: grid;
        grid-template-columns: 60px auto;

        img {
            width: 60px;
            height: auto;
            display: flex;
            align-self: center;
            cursor: pointer;
        }

        &.card-placeholder {
            background: $color-light-gray;
            outline: 1px dashed $color-gray;
            opacity: 0.6;

            .game-card-options {
                display: none;
            }
        }

        &.dark {
            background: $color-gray;

            img {
                opacity: 0.9;
            }
        }

        .game-info {
            padding: $gp / 2 $gp;
            width: 100%;
            display: flex;
            flex-direction: column;

            .game-tags {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                margin-top: $gp / 4;
            }

            i.tags {
                position: absolute;
                bottom: $gp * 1.5;
                right: $gp / 4;
            }

            .game-rating, a {
                display: inline-flex;
                font-weight: bold;
            }

            &:hover {
                a {
                    text-decoration: underline;
                }
            }

            a {
                color: $color-darkest-gray;
                cursor: pointer;
                margin-right: $gp / 2;
            }
        }

        .game-drag-handle {
            @include drag-cursor;
            position: absolute;
            color: $color-light-gray;
            right: $gp / 3;
            top: $gp / 3;

            &:hover {
                color: $color-gray;
            }
        }

        .delete-game {
            position: absolute;
            color: $color-light-gray;
            bottom: $gp / 3;
            right: $gp / 3;

            &:hover {
                color: $color-red;
            }
        }

        .tags {
            color: $color-light-gray;

            &:hover {
                color: $color-blue;
            }
        }

        .game-tag {
            margin-bottom: $gp / 3;
        }
    }

    .add-to-list {
        margin-top: $gp / 2;
    }
</style>