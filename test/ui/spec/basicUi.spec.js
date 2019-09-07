describe('Default sequencer HTML', function() {

  beforeAll(function() {
    jasmine.getFixtures().fixturesPath = 'test/ui/spec/fixtures';
    fixture = loadFixtures('index.html');
  });

  it('adds a step from the quick selector', function() {
    expect($('.step').length).toBe(1);
    expect($('.step:first img')[0].src).not.toBeUndefined();
    expect($('.step:first img')[0].src).not.toBe('');
    // needs more setup
    $("[data-value='brightness']").click()
    expect($('.step').length).toBe(2);
    expect($('.step:last img')[0].src).not.toBeUndefined();
    expect($('.step:last img')[0].src).not.toBe('');
    expect($('.step:last img')[0].src).not.toEqual($('.step:first img')[0].src);
    // TODO: test the actual `src` attribute of $('.step:last img') against a known value
  });

});
