'use strict';


const Helpers = require('./helpers');
const Course = require('../lib/course');


describe('Course(path, cb)', () => {

  it('should log error when README.md is empty', done => Course(
    Helpers.resolveFixtureDirReadmePath('00-course-empty'),
    (err, data) => {
      expect(err).toBe(null);
      expect(data.result.slug).toBe('course-empty');
      expect(data.result.order).toBe(0);
      expect(data.log).toMatchSnapshot();
      done();
    }
  ));

  it('should log error when README.md doesnt start with h1', done => Course(
    Helpers.resolveFixtureDirReadmePath('01-course-no-title'),
    (err, data) => {
      expect(err).toBe(null);
      expect(data.result.slug).toBe('course-no-title');
      expect(data.result.order).toBe(1);
      expect(data.log).toMatchSnapshot();
      done();
    }
  ));

  it('should have empty tags if not found', done => Course(
    Helpers.resolveFixtureDirReadmePath('02-course-no-tags'),
    (err, data) => {
      expect(err).toBe(null);
      expect(data.result.order).toBe(2);
      expect(data.result.tags).toEqual({ primary: [], secondary: [] });
      done();
    }
  ));

  it('should read primary (default) tags', done => Course(
    Helpers.resolveFixtureDirReadmePath('02-course-tags'),
    (err, data) => {
      expect(err).toBe(null);
      expect(data.result.order).toBe(2);
      expect(data.result.tags).toEqual({ primary: ['foo', 'bar', 'baz'], secondary: [] });
      done();
    }
  ));

  it('should read main and secondary tags', done => Course(
    Helpers.resolveFixtureDirReadmePath('02-course-secondary-tags'),
    (err, data) => {
      expect(err).toBe(null);
      expect(data.result.order).toBe(2);
      expect(data.result.tags).toMatchSnapshot();
      done();
    }
  ));

  it.skip('should...', done => Course(
    Helpers.resolveFixtureDirReadmePath('02-course'),
    (err, course) => {
      expect(err).toBe(null);
      expect(course.order).toBe(2);
      expect(course.parsed.tags).toEqual({ primary: ['foo', 'bar', 'baz'], secondary: [] });
      console.log(course.parsed.tags);
      done();
    }
  ));

});