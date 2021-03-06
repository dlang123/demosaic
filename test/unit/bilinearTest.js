let flatmap = require('flatmap');
let range = require('lodash.range');
let chai = require('chai');
let Demosaic = require('../../Demosaic');
let channels = require('../util/channels');

chai.should();

describe('Bilinear', () => {
    'use strict';

    it('should exist', () => {
        Demosaic.bilinear({width: 0, height: 0, data: Buffer.from([])});
    });

    it('should demosaic solid red 2x2 image with RGGB bayer CFA', () => {
        let raw = Buffer.from([1, 0, 0, 0]);
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw});
        channels.red(rgb).should.eql(Buffer.from([1, 1, 1, 1]));
        channels.green(rgb).should.eql(Buffer.from([0, 0, 0, 0]));
        channels.blue(rgb).should.eql(Buffer.from([0, 0, 0, 0]));
    });

    it('should demosaic solid green 2x2 image with RGGB bayer CFA', () => {
        let raw = Buffer.from([0, 1, 1, 0]);
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw});
        channels.red(rgb).should.eql(Buffer.from([0, 0, 0, 0]));
        channels.green(rgb).should.eql(Buffer.from([1, 1, 1, 1]));
        channels.blue(rgb).should.eql(Buffer.from([0, 0, 0, 0]));
    });

    it('should demosaic solid blue 2x2 image with RGGB bayer CFA', () => {
        let raw = Buffer.from([0, 0, 0, 1]);
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw});
        channels.red(rgb).should.eql(Buffer.from([0, 0, 0, 0]));
        channels.green(rgb).should.eql(Buffer.from([0, 0, 0, 0]));
        channels.blue(rgb).should.eql(Buffer.from([1, 1, 1, 1]));
    });

    it('should interpolate red over 2x2 image with RGGB bayer CFA', () => {
        let raw = Buffer.from(range(1, 5));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw});
        channels.red(rgb).should.eql(Buffer.from([1, 1, 1, 1]));
    });

    it('should interpolate red over 2x2 image with GRBG bayer CFA', () => {
        let raw = Buffer.from(range(1, 5));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw, bayer: Demosaic.Bayer.GRBG});
        channels.red(rgb).should.eql(Buffer.from([2, 2, 2, 2]));
    });

    it('should interpolate red over 2x2 image with GBRG bayer CFA', () => {
        let raw = Buffer.from(range(1, 5));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw, bayer: Demosaic.Bayer.GBRG});
        channels.red(rgb).should.eql(Buffer.from([3, 3, 3, 3]));
    });

    it('should interpolate red over 2x2 image with BGGR bayer CFA', () => {
        let raw = Buffer.from(range(1, 5));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw, bayer: Demosaic.Bayer.BGGR});
        channels.red(rgb).should.eql(Buffer.from([4, 4, 4, 4]));
    });

    it('should interpolate red over 2x2 16-bit image with RGGB bayer CFA', () => {
        let raw = Buffer.from(flatmap(range(1, 5), x => [2, x]));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw, depth: 16});
        channels.red(rgb, 2).should.eql(Buffer.from([2, 1, 2, 1, 2, 1, 2, 1]));
    });

    it('should interpolate green over 2x2 image with RGGB bayer CFA', () => {
        let raw = Buffer.from(range(1, 5));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw});

        channels.green(rgb).should.eql(Buffer.from([3, 2, 3, 3]));
    });

    it('should interpolate green over 2x2 image with GRBG bayer CFA', () => {
        let raw = Buffer.from(range(1, 5));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw, bayer: Demosaic.Bayer.GRBG});

        channels.green(rgb).should.eql(Buffer.from([1, 3, 3, 4]));
    });

    it('should interpolate green over 2x2 image with GBRG bayer CFA', () => {
        let raw = Buffer.from(range(1, 5));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw, bayer: Demosaic.Bayer.GBRG});

        channels.green(rgb).should.eql(Buffer.from([1, 3, 3, 4]));
    });

    it('should interpolate green over 2x2 image with BGGR bayer CFA', () => {
        let raw = Buffer.from(range(1, 5));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw, bayer: Demosaic.Bayer.BGGR});

        channels.green(rgb).should.eql(Buffer.from([3, 2, 3, 3]));
    });

    it('should interpolate green over 2x2 16-bit image with RGGB bayer CFA', () => {
        let raw = Buffer.from(flatmap(range(1, 5), x => [3, x]));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw, depth: 16});

        channels.green(rgb, 2).should.eql(Buffer.from([3, 3, 3, 2, 3, 3, 3, 3]));
    });

    it('should interpolate green over 2x2 16-bit little-endian image with RGGB bayer CFA', () => {
        let raw = Buffer.from(flatmap(range(1, 5), x => [x, 3]));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw, depth: 16, endianness: 'little'});

        channels.green(rgb, 2).should.eql(Buffer.from([3, 3, 2, 3, 3, 3, 3, 3]));
    });

    it('should interpolate blue over 2x2 image with RGGB bayer CFA', () => {
        let raw = Buffer.from(range(1, 5));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw});
        channels.blue(rgb).should.eql(Buffer.from([4, 4, 4, 4]));
    });

    it('should interpolate blue over 2x2 image with GRBG bayer CFA', () => {
        let raw = Buffer.from(range(1, 5));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw, bayer: Demosaic.Bayer.GRBG});
        channels.blue(rgb).should.eql(Buffer.from([3, 3, 3, 3]));
    });

    it('should interpolate blue over 2x2 image with GBRG bayer CFA', () => {
        let raw = Buffer.from(range(1, 5));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw, bayer: Demosaic.Bayer.GBRG});
        channels.blue(rgb).should.eql(Buffer.from([2, 2, 2, 2]));
    });

    it('should interpolate blue over 2x2 image with BGGR bayer CFA', () => {
        let raw = Buffer.from(range(1, 5));
        let rgb = Demosaic.bilinear({width: 2, height: 2, data: raw, bayer: Demosaic.Bayer.BGGR});
        channels.blue(rgb).should.eql(Buffer.from([1, 1, 1, 1]));
    });

    it('should interpolate red over 4x4 image with RGGB bayer CFA', () => {
        let raw = Buffer.from(range(1, 17));
        let rgb = Demosaic.bilinear({width: 4, height: 4, data: raw});
        channels.red(rgb).should.eql(Buffer.from([1, 2, 3, 3, 5, 6, 7, 7, 9, 10, 11, 11, 9, 10, 11, 11]));
    });

    it('should interpolate green over 4x4 image with RGGB bayer CFA', () => {
        let raw = Buffer.from(range(1, 17));
        let rgb = Demosaic.bilinear({width: 4, height: 4, data: raw});

        channels.green(rgb).should.eql(Buffer.from([4, 2, 5, 4, 5, 6, 7, 8, 10, 10, 11, 12, 13, 12, 15, 14]));
    });

    it('should interpolate blue over 4x4 image with RGGB bayer CFA', () => {
        let raw = Buffer.from(range(1, 17));
        let rgb = Demosaic.bilinear({width: 4, height: 4, data: raw});
        channels.blue(rgb).should.eql(Buffer.from([6, 6, 7, 8, 6, 6, 7, 8, 10, 10, 11, 12, 14, 14, 15, 16]));
    });

    it('should interpolate red over 3x3 image with RGGB bayer CFA', () => {
        let raw = Buffer.from(range(1, 10));
        let rgb = Demosaic.bilinear({width: 3, height: 3, data: raw});
        channels.red(rgb).should.eql(Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    });

    it('should interpolate green over 3x3 image with RGGB bayer CFA', () => {
        let raw = Buffer.from(range(1, 10));
        let rgb = Demosaic.bilinear({width: 3, height: 3, data: raw});

        channels.green(rgb).should.eql(Buffer.from([3, 2, 4, 4, 5, 6, 6, 8, 7]));
    });

    it('should interpolate blue over 3x3 image with RGGB bayer CFA', () => {
        let raw = Buffer.from(range(1, 10));
        let rgb = Demosaic.bilinear({width: 3, height: 3, data: raw});
        channels.blue(rgb).should.eql(Buffer.from([5, 5, 5, 5, 5, 5, 5, 5, 5]));
    });
});

